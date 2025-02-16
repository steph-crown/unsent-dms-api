import { IsNumber, IsString } from 'class-validator';

export class GetMessagesDto {
  @IsString()
  to: string;

  @IsNumber()
  limit: number;

  @IsNumber()
  offset: number;
}
