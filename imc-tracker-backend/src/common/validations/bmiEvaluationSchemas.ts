import * as yup from "yup";

export const createBmiEvaluationSchema = yup.object({
  body: yup.object({
    altura: yup
      .number()
      .required("Altura é obrigatória")
      .positive("Altura deve ser um número positivo")
      .max(999.99, "Altura deve ter no máximo 5 dígitos com 2 casas decimais"),

    peso: yup
      .number()
      .required("Peso é obrigatório")
      .positive("Peso deve ser um número positivo")
      .max(999.99, "Peso deve ter no máximo 5 dígitos com 2 casas decimais"),

    id_usuario_avaliacao: yup
      .string()
      .uuid("ID do avaliador deve ser um UUID válido")
      .required("ID do avaliador é obrigatório"),

    id_usuario_aluno: yup
      .string()
      .uuid("ID do aluno deve ser um UUID válido")
      .required("ID do aluno é obrigatório"),
  }),
});

export const getBmiEvaluationSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .uuid("Id deve ser um UUID válido")
      .required("O id deve ser informado"),
  }),
});

export const updateBmiEvaluationSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .uuid("Id deve ser um UUID válido")
      .required("O id deve ser informado"),
  }),
  body: yup.object({
    altura: yup
      .number()
      .positive("Altura deve ser um número positivo")
      .max(999.99, "Altura deve ter no máximo 5 dígitos com 2 casas decimais"),

    peso: yup
      .number()
      .positive("Peso deve ser um número positivo")
      .max(999.99, "Peso deve ter no máximo 5 dígitos com 2 casas decimais"),

    imc: yup
      .number()
      .positive("IMC deve ser um número positivo")
      .max(999.99, "IMC deve ter no máximo 5 dígitos com 2 casas decimais"),

    classificacao: yup
      .string()
      .max(30, "Classificação deve ter no máximo 30 caracteres"),

    id_usuario_avaliacao: yup
      .string()
      .uuid("ID do avaliador deve ser um UUID válido"),

    id_usuario_aluno: yup.string().uuid("ID do aluno deve ser um UUID válido"),
  }),
});

export const deleteBmiEvaluationSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .uuid("Id deve ser um UUID válido")
      .required("O id deve ser informado"),
  }),
});
