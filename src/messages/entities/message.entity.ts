import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  to: string;

  @CreateDateColumn()
  createdAt: string;

  @Column()
  message: string;

  @Column()
  bgColor: string;

  @Column()
  fgColor: string;
}
