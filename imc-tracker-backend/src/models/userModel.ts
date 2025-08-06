import { Situacao } from "../common/enums/situacao.enum";
import { Perfil } from "../common/enums/perfil.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BmiEvaluation } from "./bmiEvaluationModel";

@Entity("usuario")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  @OneToMany(() => BmiEvaluation, (avaliacao) => avaliacao.usuarioAvaliador)
  avaliacoesFeitas: BmiEvaluation[];

  @OneToMany(() => BmiEvaluation, (avaliacao) => avaliacao.usuarioAvaliado)
  avaliacoesRecebidas: BmiEvaluation[];

  @Column({
    type: "text",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  dt_inclusao: Date;
}
