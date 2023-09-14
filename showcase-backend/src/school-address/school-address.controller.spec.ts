import { Test, TestingModule } from '@nestjs/testing';
import { SchoolAddressController } from './school-address.controller';

describe('SchoolAddressController', () => {
  let controller: SchoolAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolAddressController],
    }).compile();

    controller = module.get<SchoolAddressController>(SchoolAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
