import { Test, TestingModule } from '@nestjs/testing';
import { JustificacionController } from './justificacion.controller.js';
import { JustificacionService } from './justificacion.service.js';

describe('JustificacionController', () => {
  let controller: JustificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JustificacionController],
      providers: [JustificacionService],
    }).compile();

    controller = module.get<JustificacionController>(JustificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
