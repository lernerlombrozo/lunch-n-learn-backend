import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubscriptionDto } from './createSubscription.dto';
import { Subscription, SubscriptionDocument } from './subscription.schema';
import * as webPush from 'web-push';

@Injectable()
export class AppService {
  constructor(@InjectModel(Subscription.name) private subscriptionModel: Model<SubscriptionDocument>) {}

  async postSubscription(createSubscriptionDto: CreateSubscriptionDto): Promise<SubscriptionDocument> {
    const createdSubscription = new this.subscriptionModel(createSubscriptionDto);
    return await createdSubscription.save();
  }

  async postMessage(message: string): Promise<string> {
    console.log(message);
    const subscriptions = await this.subscriptionModel.find();
    webPush.setVapidDetails(
      'mailto:d.lerner@ghostlab.ca',
      process.env.PUBLIC_VAPID_KEY,
      process.env.PRIVATE_VAPID_KEY,
    );
    subscriptions.forEach(subscription =>
      webPush
        .sendNotification(
          subscription,
          JSON.stringify({
            title: 'New message!',
            content: message,
          }),
        )
        .catch(err => {
          console.log(err);
        }),
    );
    return message;
  }
}
