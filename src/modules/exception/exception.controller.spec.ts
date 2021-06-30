import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionController } from './exception.controller';

describe('Exception Controller', () => {
  let controller: ExceptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExceptionController],
    }).compile();

    controller = module.get<ExceptionController>(ExceptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
