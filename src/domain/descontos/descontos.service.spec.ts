import { Test, TestingModule } from '@nestjs/testing';
import { DescontosService } from './descontos.service';

describe('DescontosService', () => {
  let service: DescontosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DescontosService],
    }).compile();

    service = module.get<DescontosService>(DescontosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
