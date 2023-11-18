import { Test, TestingModule } from '@nestjs/testing';
import { DescontosController } from './descontos.controller';

describe('DescontosController', () => {
  let controller: DescontosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescontosController],
    }).compile();

    controller = module.get<DescontosController>(DescontosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
