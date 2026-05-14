import { Test, TestingModule } from '@nestjs/testing';
import { QuejasController } from './quejas.controller';
import { QuejasService } from './quejas.service';

describe('QuejasController', () => {
  let controller: QuejasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuejasController],
      providers: [QuejasService],
    }).compile();

    controller = module.get<QuejasController>(QuejasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
