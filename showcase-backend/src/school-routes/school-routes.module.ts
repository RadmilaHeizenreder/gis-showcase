import { Module } from '@nestjs/common';
import { SchoolRoutesService } from './school-routes.service';
import { SchoolRoutesController } from './school-routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolRouteEntity } from './entities/school-route.entity';

@Module({
  controllers: [SchoolRoutesController],
  providers: [SchoolRoutesService],
  imports: [TypeOrmModule.forFeature([SchoolRouteEntity])],
  exports: [SchoolRoutesService],
})
export class SchoolRoutesModule {}
