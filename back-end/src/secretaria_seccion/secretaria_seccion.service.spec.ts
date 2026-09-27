import { Test, TestingModule } from '@nestjs/testing';
import { SecretariaSeccionService } from './secretaria_seccion.service.js';

describe('SecretariaSeccionService', () => {
  let service: SecretariaSeccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretariaSeccionService],
    }).compile();

    service = module.get<SecretariaSeccionService>(SecretariaSeccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
