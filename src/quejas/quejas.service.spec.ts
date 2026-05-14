import { Test, TestingModule } from '@nestjs/testing';
import { QuejasService } from './quejas.service';

describe('QuejasService', () => {
  let service: QuejasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuejasService],
    }).compile();

    service = module.get<QuejasService>(QuejasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
