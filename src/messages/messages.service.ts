import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { DataSource, Repository } from 'typeorm';
import { runInTransaction } from 'src/common/utils/transaction.util';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private datasource: DataSource,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const message = new Message();

    message.to = createMessageDto.to;
    message.message = createMessageDto.message;
    message.bgColor = createMessageDto.bgColor;
    message.fgColor = createMessageDto.fgColor;

    const result = await runInTransaction(
      this.datasource,
      async (queryRunner) => {
        return await queryRunner.manager.save(message);
      },
    );

    return result;
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
