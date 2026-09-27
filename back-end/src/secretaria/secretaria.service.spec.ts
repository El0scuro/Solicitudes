import { Test, TestingModule } from '@nestjs/testing';
import { SecretariaService } from './secretaria.service.js';

describe('SecretariaService', () => {
  let service: SecretariaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecretariaService],
    }).compile();

    service = module.get<SecretariaService>(SecretariaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
