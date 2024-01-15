import { Controller, Get } from '@nestjs/common';
import { ResultService } from './result.service';
import { Result } from './result.schema';

@Controller('/stock/result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get()
  getResults(): Promise<Result[]> {
    return this.resultService.getResults();
  }
}
