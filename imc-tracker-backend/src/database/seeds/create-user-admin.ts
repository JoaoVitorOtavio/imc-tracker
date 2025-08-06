import { Perfil } from "../../common/enums/perfil.enum";
import { User } from "../../models/userModel";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";
import { Situacao } from "../../common/enums/situacao.enum";

async function seed() {
  await AppDataSource.initialize();

  const userRepository = AppDataSource.getRepository(User);

  const passwordEncrypted = await bcrypt.hash("123123", 10);

  const user = userRepository.create({
    nome: "Administrador",
    usuario: "admin@admin.com",
    senha: passwordEncrypted,
    perfil: Perfil.ADMIN,
    situacao: Situacao.ATIVO,
    dt_inclusao: new Date(),
  });

  await userRepository.save(user);

  console.log("Usuário admin criado com sucesso!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Erro ao rodar a seed:", err);
  process.exit(1);
});
