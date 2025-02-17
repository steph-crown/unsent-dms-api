import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { runInTransaction } from 'src/common/utils/transaction.util';
import { DataSource, Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

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

  async findAll(to: string, limit: number, offset: number) {
    // if to is not provided, return all messages by limit and offset, else return messages by to, limit and offset

    const whereCondition = to ? { to } : {};

    // let messages: Message[];

    const [messages, total] = await this.messageRepository.findAndCount({
      where: whereCondition,
      skip: offset * limit,
      take: limit,
    });

    return { messages, total };
  }

  async findOne(id: string) {
    const message = await this.messageRepository.findOneBy({ id });

    return message;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
