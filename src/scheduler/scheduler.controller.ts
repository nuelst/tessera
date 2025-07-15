import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { SchedulerService } from './scheduler.service';

@Public()
@ApiTags('scheduler')
@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) { }

  @Post('dispatch-now')
  @ApiOperation({ summary: 'Manually trigger capsule dispatch' })
  @ApiResponse({ status: 200, description: 'Dispatch triggered successfully' })
  async dispatchNow() {
    await this.schedulerService.handleCapsuleDispatch();
    return {
      message: 'Dispatch process triggered manually',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('retry-failed')
  @ApiOperation({ summary: 'Manually retry failed capsules' })
  @ApiResponse({ status: 200, description: 'Retry process triggered successfully' })
  async retryFailed() {
    await this.schedulerService.retryFailedCapsules();
    return {
      message: 'Retry process triggered manually',
      timestamp: new Date().toISOString(),
    };
  }
} 