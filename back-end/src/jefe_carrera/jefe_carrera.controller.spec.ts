import { Test, TestingModule } from '@nestjs/testing';
import { JefeCarreraController } from './jefe_carrera.controller.js';
import { JefeCarreraService } from './jefe_carrera.service.js';

describe('JefeCarreraController', () => {
  let controller: JefeCarreraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JefeCarreraController],
      providers: [JefeCarreraService],
    }).compile();

    controller = module.get<JefeCarreraController>(JefeCarreraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
