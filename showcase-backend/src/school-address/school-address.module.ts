import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { SchoolAddressService } from './school-address.service';
import { SchoolAddressController } from './school-address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolAddressEntity } from './entities/school.entity';

@Module({
  providers: [SchoolAddressService],
  controllers: [SchoolAddressController],
  imports: [TypeOrmModule.forFeature([SchoolAddressEntity])],
  exports: [SchoolAddressService],
})
export class SchoolAddressModule implements OnApplicationBootstrap {
  constructor(private readonly schoolAddressService: SchoolAddressService) {}
  async onApplicationBootstrap(): Promise<void> {
    await this.schoolAddressService.bootstrap();
  }
}
