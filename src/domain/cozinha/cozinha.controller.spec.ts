import { Test, TestingModule } from '@nestjs/testing';
import { CozinhaController } from './cozinha.controller';

describe('CozinhaController', () => {
  let controller: CozinhaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CozinhaController],
    }).compile();

    controller = module.get<CozinhaController>(CozinhaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
