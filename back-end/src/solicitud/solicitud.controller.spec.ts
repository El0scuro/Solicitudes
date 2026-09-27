import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudController } from './solicitud.controller.js';
import { SolicitudService } from './solicitud.service.js';

describe('SolicitudController', () => {
  let controller: SolicitudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudController],
      providers: [SolicitudService],
    }).compile();

    controller = module.get<SolicitudController>(SolicitudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
