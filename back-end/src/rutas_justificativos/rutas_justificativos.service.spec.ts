import { Test, TestingModule } from '@nestjs/testing';
import { RutasJustificativosService } from './rutas_justificativos.service.js';

describe('RutasJustificativosService', () => {
  let service: RutasJustificativosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RutasJustificativosService],
    }).compile();

    service = module.get<RutasJustificativosService>(RutasJustificativosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
