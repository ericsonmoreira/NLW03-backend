import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Orphanage } from './Orphanage';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Orphanage, (orphanage) => orphanage.images)
  @JoinColumn({ name: 'orphanage_id' })
  orphanage: Orphanage;
}
