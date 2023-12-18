import { Test, TestingModule } from '@nestjs/testing';
import { SchoolRoutesService } from './school-routes.service';

describe('SchoolRoutesService', () => {
  let service: SchoolRoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolRoutesService],
    }).compile();

    service = module.get<SchoolRoutesService>(SchoolRoutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
