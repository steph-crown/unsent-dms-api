import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetMessagesDto {
  @IsString()
  @ApiProperty()
  @ApiPropertyOptional()
  to: string;

  @ApiProperty()
  @IsNumber()
  limit: number;

  @ApiProperty()
  @IsNumber()
  offset: number;
}
