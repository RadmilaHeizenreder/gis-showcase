import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionEntity } from './entities/submission.entity';
import { SchoolRouteEntity } from 'src/school-routes/entities/school-route.entity';

@Module({
  controllers: [SubmissionController],
  providers: [SubmissionService],
  imports: [TypeOrmModule.forFeature([SubmissionEntity, SchoolRouteEntity])],
  exports: [SubmissionService],
})
export class SubmissionModule {}
