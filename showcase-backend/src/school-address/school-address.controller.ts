import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SchoolAddressService } from './school-address.service';
import { CreateSchoolsDto } from './dto/school.dto';
import { SchoolAddressEntity } from './entities/school.entity';

@Controller('school')
export class SchoolAddressController {
  constructor(private readonly schoolAddressService: SchoolAddressService) {}

  @Get()
  findAll() {
    return this.schoolAddressService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolAddressService.findOne(+id);
  }
  @Post()
  async createAddress(
    @Body() createSchoolsDto: CreateSchoolsDto,
  ): Promise<SchoolAddressEntity> {
    return await this.schoolAddressService.createSchoolAddress(
      createSchoolsDto,
    );
  }
  @Post('import')
  async createAddresses(@Query('url') filePath: string): Promise<void> {
    await this.schoolAddressService.import(filePath);
  }
}
