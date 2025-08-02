import * as yup from "yup";

export const getUserTokenSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .uuid("Id deve ser um UUID válido")
      .required("O id deve ser informado"),
  }),
});

export const createUserTokenSchema = yup.object({
  body: yup.object({
    refreshToken: yup.string().required("O refreshToken deve ser informado"),
    id_usuario: yup
      .string()
      .uuid("ID do usuário deve ser um UUID válido")
      .required("O id do usuário deve ser informado"),
    expiracao_token: yup
      .date()
      .required("A data de expiração do token deve ser informada"),
  }),
});

export const updateUserTokenSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .uuid("Id deve ser um UUID válido")
      .required("O id deve ser informado"),
  }),
  body: yup.object({
    refreshToken: yup.string(),
    id_usuario: yup.string().uuid("ID do usuário deve ser um UUID válido"),
    expiracao_token: yup.date(),
  }),
});

export const deleteUserTokenSchema = yup.object({
  params: yup.object({
    id: yup
      .string()
      .uuid("Id deve ser um UUID válido")
      .required("O id deve ser informado"),
  }),
});
