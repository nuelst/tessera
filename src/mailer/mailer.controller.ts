import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { MailerDto } from './dto/mailer.dto';
import { MailerService } from './mailer.service';

@Public()
@ApiTags('mailer')
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('test')
  @ApiOperation({ summary: 'Test email sending functionality' })
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async testEmail(@Body() mailerDto: MailerDto) {
    return await this.mailerService.sendCapsule(mailerDto);
  }

  @Post('send-capsule')
  @ApiOperation({ summary: 'Send a time capsule email' })
  @ApiResponse({ status: 200, description: 'Capsule email sent successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async sendCapsule(@Body() mailerDto: MailerDto) {
    return await this.mailerService.sendCapsule(mailerDto);
  }
}
