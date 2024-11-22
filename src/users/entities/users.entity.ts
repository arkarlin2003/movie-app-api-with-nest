import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 220,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 220,
  })
  email: string;

  @Column({
    type: 'text',
  })
  password: string;
}
