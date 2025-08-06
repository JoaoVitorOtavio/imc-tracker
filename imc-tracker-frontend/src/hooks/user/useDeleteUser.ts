import { ErrorResponse } from "@/common/interfaces/error-response.interface";
import { toaster } from "@/components/ui/toaster";
import { deleteUser } from "@/services/user/deleteUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (_data, id) => {
      console.log("OLHA O ID DO DELETE", id);
      toaster.create({
        title: `Avaliação de IMC deletada com sucesso!`,
        type: "success",
        duration: 3000,
        closable: true,
      });

      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Erro ao excluir usuário, por favor tente novamente mais tarde";

      toaster.error({
        title: errorMessage,
        type: "error",
        duration: 3000,
        closable: true,
      });
    },
  });
}
