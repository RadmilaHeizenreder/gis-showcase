import { Injectable } from '@nestjs/common';
import { SchoolAddressEntity } from './entities/school.entity';
import { CreateSchoolsDto } from './dto/school.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SchoolAddressService {
  constructor(
    @InjectRepository(SchoolAddressEntity)
    private readonly repo: Repository<SchoolAddressEntity>, // private readonly parserService: ParserService,
  ) {}
  async findAll() {
    return `This action returns all schooladdress`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} schooladdress`;
  }

  async createSchoolAddress(
    createSchoolsDto: CreateSchoolsDto,
  ): Promise<SchoolAddressEntity> {
    try {
      return this.repo.save(createSchoolsDto);
    } catch (err) {
      console.log(`Error while saving path to database: ${err}`);
    }
  }

  async import(): Promise<void> {
    const autocompletionPromises: Promise<SchoolAddressEntity | null>[] = [];
    const address = [];
    for (const element of address) {
      autocompletionPromises.push(
        this.createSchoolAddress({
          name: element.name,
          coordinates: element.coordinates,
        }),
      );
    }
    await Promise.all(autocompletionPromises);
  }
}
