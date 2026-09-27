import { Test, TestingModule } from '@nestjs/testing';
import { CambioSeccionService } from './cambio_seccion.service.js';

describe('CambioSeccionService', () => {
  let service: CambioSeccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CambioSeccionService],
    }).compile();

    service = module.get<CambioSeccionService>(CambioSeccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
