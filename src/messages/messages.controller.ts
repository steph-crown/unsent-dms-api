import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { GetMessagesDto } from './dto/get-messages.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    const response = await this.messagesService.create(createMessageDto);

    return {
      message: 'Message created successfully',
      data: response,
      isSuccessful: true,
    };
  }

  @Get()
  async findAll(@Query() query: GetMessagesDto) {
    const response = await this.messagesService.findAll(
      query.to,
      query.limit,
      query.offset,
    );

    return {
      message: 'Messages fetched successfully',
      data: response,
      isSuccessful: true,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.messagesService.findOne(id);

    return {
      message: 'Message fetched successfully',
      data: response,
      isSuccessful: true,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
