import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./userModel";

@Entity("usuario_token")
export class UsuarioToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  refresh_token: string;

  @Column({ type: "uuid", nullable: false })
  id_usuario: string;

  @ManyToOne(() => User, { onUpdate: "CASCADE", onDelete: "NO ACTION" })
  @JoinColumn({ name: "id_usuario" })
  usuario: User;

  @Column({ type: "datetime", nullable: false })
  expiracao_token: Date;

  @CreateDateColumn({ type: "datetime", nullable: false })
  dt_inclusao: Date;
}
