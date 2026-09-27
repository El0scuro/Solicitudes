import { Test, TestingModule } from '@nestjs/testing';
import { AlmacenamientoService } from './almacenamiento.service.js';

describe('AlmacenamientoService', () => {
  let service: AlmacenamientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlmacenamientoService],
    }).compile();

    service = module.get<AlmacenamientoService>(AlmacenamientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
