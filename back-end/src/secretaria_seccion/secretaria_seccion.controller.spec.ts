import { Test, TestingModule } from '@nestjs/testing';
import { SecretariaSeccionController } from './secretaria_seccion.controller.js';
import { SecretariaSeccionService } from './secretaria_seccion.service.js';

describe('SecretariaSeccionController', () => {
  let controller: SecretariaSeccionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretariaSeccionController],
      providers: [SecretariaSeccionService],
    }).compile();

    controller = module.get<SecretariaSeccionController>(SecretariaSeccionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
