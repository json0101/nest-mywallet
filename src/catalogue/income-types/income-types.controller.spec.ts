import { Test, TestingModule } from '@nestjs/testing';
import { IncomeTypesController } from './income-types.controller';

describe('IncomeTypesController', () => {
  let controller: IncomeTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomeTypesController],
    }).compile();

    controller = module.get<IncomeTypesController>(IncomeTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
