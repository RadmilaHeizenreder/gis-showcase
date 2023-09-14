import { Module } from '@nestjs/common';
import { SchoolAddressService } from './school-address.service';
import { SchoolAddressController } from './school-address.controller';

@Module({
  providers: [SchoolAddressService],
  controllers: [SchoolAddressController],
})
export class SchoolAddressModule {}
