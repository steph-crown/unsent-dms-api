import { Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

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
