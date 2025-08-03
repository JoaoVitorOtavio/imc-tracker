import { ErrorResponse } from "@/common/interfaces/error-response.interface";
import { EditUser } from "@/common/interfaces/user/edit-user.intercace";
import { toaster } from "@/components/ui/toaster";
import { editUser } from "@/services/user/editUser";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useEditUser() {
  return useMutation({
    mutationFn: ({ id, user }: { id: string; user: EditUser }) => {
      if (user.senha === "") delete user.senha;

      return editUser(id, user);
    },
    onSuccess: (data) => {
      toaster.create({
        title: `Usuário editado com sucesso!`,
        type: "success",
        duration: 3000,
        closable: true,
      });
      console.log("DDATA EDIT USER", data);
      // TODO: salvar em um global state
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.error ||
        "Erro ao editar usuário, por favor tente novamente mais tarde";

      toaster.create({
        title: errorMessage,
        type: "error",
        duration: 3000,
        closable: true,
      });
    },
  });
}
