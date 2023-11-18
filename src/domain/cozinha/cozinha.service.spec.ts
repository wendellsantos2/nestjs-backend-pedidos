import { Test, TestingModule } from '@nestjs/testing';
import { CozinhaService } from './cozinha.service';

describe('CozinhaService', () => {
  let service: CozinhaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CozinhaService],
    }).compile();

    service = module.get<CozinhaService>(CozinhaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
