import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./userModel";

@Entity("avaliacao_imc")
export class AvaliacaoImc {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: false })
  altura: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: false })
  peso: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: false })
  imc: number;

  @Column({ type: "varchar", length: 30, nullable: false })
  classificacao: string;

  @Column({ type: "uuid", nullable: false })
  id_usuario_avaliacao: string;

  @Column({ type: "uuid", nullable: false })
  id_usuario_aluno: string;

  @ManyToOne(() => User, { onUpdate: "CASCADE", onDelete: "NO ACTION" })
  @JoinColumn({ name: "id_usuario_avaliacao" })
  usuarioAvaliador: User;

  @ManyToOne(() => User, { onUpdate: "CASCADE", onDelete: "NO ACTION" })
  @JoinColumn({ name: "id_usuario_aluno" })
  usuarioAvaliado: User;

  @CreateDateColumn({ type: "datetime", nullable: false })
  dt_inclusao: Date;
}
