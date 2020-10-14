import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from './Image';

@Entity('orphanages')
export class Orphanage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', scale: 10, precision: 2 })
  latitude: number;

  @Column({ type: 'decimal', scale: 10, precision: 2 })
  longitude: number;

  @Column({ type: 'text' })
  about: string;

  @Column({ type: 'text' })
  instructions: string;

  @Column()
  opening_hours: string;

  @Column({ default: false })
  open_on_week: boolean;

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({name: 'orphanage_id'})
  images: Image[];
}
