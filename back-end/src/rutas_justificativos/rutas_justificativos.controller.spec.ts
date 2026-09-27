import { Test, TestingModule } from '@nestjs/testing';
import { RutasJustificativosController } from './rutas_justificativos.controller.js';
import { RutasJustificativosService } from './rutas_justificativos.service.js';

describe('RutasJustificativosController', () => {
  let controller: RutasJustificativosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RutasJustificativosController],
      providers: [RutasJustificativosService],
    }).compile();

    controller = module.get<RutasJustificativosController>(RutasJustificativosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
