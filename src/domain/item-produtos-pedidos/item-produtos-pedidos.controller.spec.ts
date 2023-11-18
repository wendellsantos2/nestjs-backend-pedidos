import { Test, TestingModule } from '@nestjs/testing';
import { ItemProdutosPedidosController } from './item-produtos-pedidos.controller';

describe('ItemProdutosPedidosController', () => {
  let controller: ItemProdutosPedidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemProdutosPedidosController],
    }).compile();

    controller = module.get<ItemProdutosPedidosController>(ItemProdutosPedidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
