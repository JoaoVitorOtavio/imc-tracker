import * as yup from "yup";
import { Perfil } from "../enums/perfil.enum";
import { Situacao } from "../enums/situacao.enum";

export const updateUserSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .uuid("Id deve ser um UUID válido")
      .required("O id deve ser informado"),
  }),
  body: yup.object({
    nome: yup.string().max(60, "O nome deve ter no máximo 60 caracteres"),
    usuario: yup.string().max(60, "O usuário deve ter no máximo 60 caracteres"),
    senha: yup.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    perfil: yup.mixed<Perfil>().oneOf(Object.values(Perfil), "Perfil inválido"),
    situacao: yup
      .mixed<Situacao>()
      .oneOf(Object.values(Situacao), "Situação inválida"),
  }),
});

export const createUserSchema = yup.object({
  body: yup.object({
    nome: yup
      .string()
      .max(60, "O nome deve ter no máximo 60 caracteres")
      .required("O nome deve ser informado"),
    usuario: yup
      .string()
      .max(60, "O usuário deve ter no máximo 60 caracteres")
      .required("O usuário deve ser informado"),
    senha: yup
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("A senha deve ser informada"),
    perfil: yup
      .mixed<Perfil>()
      .oneOf(Object.values(Perfil), "Perfil inválido")
      .required("O perfil deve ser informado"),
    situacao: yup
      .mixed<Situacao>()
      .oneOf(Object.values(Situacao), "Situação inválida")
      .required("A situação deve ser informada"),
  }),
});

export const getUserSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .uuid("Id deve ser um UUID válido")
      .required("O id deve ser informado"),
  }),
});

export const deleteUserSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .uuid("Id deve ser um UUID válido")
      .required("O id deve ser informado"),
  }),
});
