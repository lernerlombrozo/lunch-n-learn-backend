import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Subscription, SubscriptionSchema } from './subscription.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@lunchnlearn.ik6fc.mongodb.net/test`,
    ),
    MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }]),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
