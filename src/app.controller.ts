import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateSubscriptionDto } from './createSubscription.dto';
import { SubscriptionDocument } from './subscription.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('subscriptions')
  postSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto): Promise<SubscriptionDocument> {
    return this.appService.postSubscription(createSubscriptionDto);
  }

  @Post('messages')
  postMessage(@Body('message') message: string): Promise<string> {
    return this.appService.postMessage(message);
  }
}
