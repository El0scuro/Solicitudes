import { Test, TestingModule } from '@nestjs/testing';
import { FichaController } from './ficha.controller.js';
import { FichaService } from './ficha.service.js';

describe('FichaController', () => {
  let controller: FichaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FichaController],
      providers: [FichaService],
    }).compile();

    controller = module.get<FichaController>(FichaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
