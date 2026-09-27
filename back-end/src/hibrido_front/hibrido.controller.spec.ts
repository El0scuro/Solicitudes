import { Test, TestingModule } from '@nestjs/testing';
import { HibridoController } from './hibrido.controller.js';

describe('HibridoController', () => {
  let controller: HibridoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HibridoController],
    }).compile();

    controller = module.get<HibridoController>(HibridoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
