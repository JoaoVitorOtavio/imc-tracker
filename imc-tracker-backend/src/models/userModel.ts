import { Situacao } from "../common/enums/situacao.enum";
import { Perfil } from "../common/enums/perfil.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuario")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ length: 60, nullable: false })
  nome: string;

  @Column({ length: 60, unique: true, nullable: false })
  usuario: string;

  @Column({ nullable: false })
  senha: string;

  @Column({
    nullable: false,
    length: 20,
    type: "text",
  })
  perfil: Perfil;

  @Column({ type: "text", length: 10, nullable: false })
  situacao: Situacao;

  @Column({
    type: "text",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  dt_inclusao: Date;
}
