import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema()
export class Subscription {
  @Prop()
  endpoint: string;

  @Prop(
    raw({
      auth: { type: String },
      p256dh: { type: String },
    }),
  )
  keys: { p256dh: string; auth: string };
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
