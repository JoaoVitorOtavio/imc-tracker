import { toaster } from "@/components/ui/toaster";
import { logout } from "@/services/auth/logout";
import { useMutation } from "@tanstack/react-query";

export function useLogout(onSuccess?: () => void) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toaster.create({
        title: `Deslogado com sucesso`,
        type: "success",
        duration: 3000,
        closable: true,
      });

      localStorage.removeItem("user");

      if (onSuccess) {
        onSuccess();
      }
    },
    onError: () => {
      window.location.href = "/";
    },
  });
}
