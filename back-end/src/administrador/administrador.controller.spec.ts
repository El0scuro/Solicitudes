import { Test, TestingModule } from '@nestjs/testing';
import { AdministradorController } from './administrador.controller.js';
import { AdministradorService } from './administrador.service.js';

describe('AdministradorController', () => {
  let controller: AdministradorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministradorController],
      providers: [AdministradorService],
    }).compile();

    controller = module.get<AdministradorController>(AdministradorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
