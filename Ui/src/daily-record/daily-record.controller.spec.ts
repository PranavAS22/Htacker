import { Test, TestingModule } from '@nestjs/testing';
import { DailyRecordController } from './daily-record.controller';

describe('DailyRecordController', () => {
  let controller: DailyRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyRecordController],
    }).compile();

    controller = module.get<DailyRecordController>(DailyRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
