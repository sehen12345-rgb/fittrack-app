import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';
import { NotificationType } from '../common/enums';

const mockNotificationRepo = {
  find: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: getRepositoryToken(Notification), useValue: mockNotificationRepo },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('유저의 알림 최대 50개 반환', async () => {
      const notifications = [{ id: 'n1', userId: 'u1', title: '테스트' }];
      mockNotificationRepo.find.mockResolvedValue(notifications);

      const result = await service.getAll('u1');
      expect(mockNotificationRepo.find).toHaveBeenCalledWith({
        where: { userId: 'u1' },
        order: { createdAt: 'DESC' },
        take: 50,
      });
      expect(result).toEqual(notifications);
    });
  });

  describe('markRead', () => {
    it('특정 알림을 읽음 처리', async () => {
      mockNotificationRepo.update.mockResolvedValue({ affected: 1 });
      await service.markRead('u1', 'n1');
      expect(mockNotificationRepo.update).toHaveBeenCalledWith(
        { id: 'n1', userId: 'u1' },
        { isRead: true },
      );
    });
  });

  describe('create', () => {
    it('알림 생성 및 저장', async () => {
      const mockNotification = {
        id: 'n1',
        userId: 'u1',
        type: NotificationType.MEAL_REMINDER,
        title: '식사 알림',
        message: '밥 드세요',
      };
      mockNotificationRepo.create.mockReturnValue(mockNotification);
      mockNotificationRepo.save.mockResolvedValue(mockNotification);

      const result = await service.create('u1', NotificationType.MEAL_REMINDER, '식사 알림', '밥 드세요');
      expect(result).toEqual(mockNotification);
      expect(mockNotificationRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ userId: 'u1', title: '식사 알림' }),
      );
    });
  });
});
