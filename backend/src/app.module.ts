import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GoalsModule } from './goals/goals.module';
import { FoodModule } from './food/food.module';
import { WorkoutModule } from './workout/workout.module';
import { MetricsModule } from './metrics/metrics.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AchievementsModule } from './achievements/achievements.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('DATABASE_URL');
        if (databaseUrl) {
          // Railway PostgreSQL
          return {
            type: 'postgres' as const,
            url: databaseUrl,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: false,
            ssl: { rejectUnauthorized: false },
          };
        }
        // 로컬 개발 — sql.js
        return {
          type: 'sqljs' as const,
          autoSave: true,
          location: path.join(process.cwd(), 'fitness.db'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: false,
        };
      },
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    GoalsModule,
    FoodModule,
    WorkoutModule,
    MetricsModule,
    AnalyticsModule,
    NotificationsModule,
    AchievementsModule,
  ],
})
export class AppModule {}
