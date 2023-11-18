import { Test, TestingModule } from '@nestjs/testing';
import { PontuacaoController } from './pontuacao.controller';

describe('PontuacaoController', () => {
  let controller: PontuacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PontuacaoController],
    }).compile();

    controller = module.get<PontuacaoController>(PontuacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
