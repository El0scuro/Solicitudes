import { Test, TestingModule } from '@nestjs/testing';
import { JefeCarreraService } from './jefe_carrera.service.js';

describe('JefeCarreraService', () => {
  let service: JefeCarreraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JefeCarreraService],
    }).compile();

    service = module.get<JefeCarreraService>(JefeCarreraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
