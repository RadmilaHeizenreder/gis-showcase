import { Test, TestingModule } from '@nestjs/testing';
import { SchoolRoutesController } from './school-routes.controller';
import { SchoolRoutesService } from './school-routes.service';

describe('SchoolRoutesController', () => {
  let controller: SchoolRoutesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolRoutesController],
      providers: [SchoolRoutesService],
    }).compile();

    controller = module.get<SchoolRoutesController>(SchoolRoutesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
