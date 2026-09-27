import { Test, TestingModule } from '@nestjs/testing';
import { CambioSeccionController } from './cambio_seccion.controller.js';
import { CambioSeccionService } from './cambio_seccion.service.js';

describe('CambioSeccionController', () => {
  let controller: CambioSeccionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CambioSeccionController],
      providers: [CambioSeccionService],
    }).compile();

    controller = module.get<CambioSeccionController>(CambioSeccionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
