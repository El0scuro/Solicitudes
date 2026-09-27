import { Test, TestingModule } from '@nestjs/testing';
import { HibridoService } from './hibrido.service.js';

describe('HibridoService', () => {
  let service: HibridoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HibridoService],
    }).compile();

    service = module.get<HibridoService>(HibridoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
