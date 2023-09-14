import { Test, TestingModule } from '@nestjs/testing';
import { SchoolAddressService } from './school-address.service';

describe('SchoolAddressService', () => {
  let service: SchoolAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolAddressService],
    }).compile();

    service = module.get<SchoolAddressService>(SchoolAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
