import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class KeysDto {
  @IsString()
  @IsNotEmpty()
  auth: string;

  @IsString()
  @IsNotEmpty()
  p256dh: string;
}

export class CreateSubscriptionDto {
  @IsNotEmpty()
  keys: KeysDto;

  @IsOptional()
  expirationTime: number;

  @IsString()
  @IsNotEmpty()
  endpoint: string;
}
