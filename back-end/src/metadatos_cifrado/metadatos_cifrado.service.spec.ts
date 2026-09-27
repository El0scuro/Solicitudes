import { Test, TestingModule } from '@nestjs/testing';
import { MetadatosCifradoService } from './metadatos_cifrado.service.js';

describe('MetadatosCifradoService', () => {
  let service: MetadatosCifradoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetadatosCifradoService],
    }).compile();

    service = module.get<MetadatosCifradoService>(MetadatosCifradoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
