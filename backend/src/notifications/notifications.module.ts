import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationSchedulerService } from './notification-scheduler.service';
import { User } from '../users/user.entity';
import { FoodLog } from '../food/food-log.entity';
import { WorkoutLog } from '../workout/workout-log.entity';
import { Goal } from '../goals/goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, User, FoodLog, WorkoutLog, Goal])],
  providers: [NotificationsService, NotificationSchedulerService],
  controllers: [NotificationsController],
  exports: [NotificationsService],
})
export class NotificationsModule {}
