import { Test, TestingModule } from '@nestjs/testing';
import { ItemProdutosPedidosService } from './item-produtos-pedidos.service';

describe('ItemProdutosPedidosService', () => {
  let service: ItemProdutosPedidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemProdutosPedidosService],
    }).compile();

    service = module.get<ItemProdutosPedidosService>(ItemProdutosPedidosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
