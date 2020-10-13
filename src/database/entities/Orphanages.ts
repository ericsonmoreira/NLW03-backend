import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Orphanages {
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
}
