import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';

@Entity('publisher')
export default class Publisher {
  @ApiProperty()
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @ApiProperty()
  @Column({ name: 'name' })
  name: string;

  @ApiProperty()
  @Column({
    name: 'site_link',
    nullable: true,
  })
  siteLink: string;

  @ApiProperty({
    example: '2023-04-21T14:11:54.000Z',
    description: 'Date of publisher creation',
    type: 'string',
    format: 'date-time',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    example: '2023-04-21T14:11:54.000Z',
    description: 'Date of publisher last update',
    type: 'string',
    format: 'date-time',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
