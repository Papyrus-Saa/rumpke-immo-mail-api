import { Body, Controller, Get, Post } from '@nestjs/common';
import { RumpkeaiService } from './rumpkeai.service';
import { RumpkeAIDto } from './dtos/rumpkeai.dto';
import { CreateTipFormDto } from './dtos/create-tip-form.dto';

@Controller('rumpkeai')
export class RumpkeaiController {
  constructor(private readonly rumpkeaiService: RumpkeaiService) { }

  @Post('assistant')
  rumpkeAIAssistant(
    @Body() rumpkeAIDto: RumpkeAIDto,
  ) {
    return this.rumpkeaiService.rumpkeAIAssistant(rumpkeAIDto);
  }

  @Post('tip-form')
  submitTipForm(
    @Body() createTipFormDto: CreateTipFormDto,
  ) {
    return this.rumpkeaiService.submitTipForm(createTipFormDto);
  }

  @Get('count')
  countTips() {
    return this.rumpkeaiService.countTips();
  }

  @Get('health')
  async healthCheck() {
    const version = process.env.npm_package_version || 'unknown';
    const uptime = process.uptime();
    let dbStatus = 'unknown';
    try {
      await this.rumpkeaiService.countTips();
      dbStatus = 'ok';
    } catch (e) {
      throw new (require('@nestjs/common').HttpException)({
        code: 'DB_CONNECTION_ERROR',
        message: 'Database connection failed',
        details: { error: e?.toString?.() }
      }, 500);
    }
    return {
      status: 'ok',
      version,
      uptime,
      dbStatus,
      timestamp: new Date().toISOString(),
    };
  }
}
