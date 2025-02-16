import { IsNotEmpty, IsString } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  bgColor: string;

  @IsString()
  @IsNotEmpty()
  fgColor: string;

  @CreateDateColumn()
  createdAt: string;
}
