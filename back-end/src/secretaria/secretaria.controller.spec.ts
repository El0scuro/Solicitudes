import { Test, TestingModule } from '@nestjs/testing';
import { SecretariaController } from './secretaria.controller.js';
import { SecretariaService } from './secretaria.service.js';

describe('SecretariaController', () => {
  let controller: SecretariaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretariaController],
      providers: [SecretariaService],
    }).compile();

    controller = module.get<SecretariaController>(SecretariaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
