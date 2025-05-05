import { Test, TestingModule } from '@nestjs/testing';
import { DailyRecordService } from './daily-record.service';

describe('DailyRecordService', () => {
  let service: DailyRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyRecordService],
    }).compile();

    service = module.get<DailyRecordService>(DailyRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
