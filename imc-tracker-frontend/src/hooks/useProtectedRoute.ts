import { useEffect } from "react";
import { UserOnLogin } from "@/common/interfaces/auth/login.interface";
import { useRouter } from "next/navigation";

export function useProtectedRoute(allowedRoles: Array<UserOnLogin["perfil"]>) {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      router.replace("/401");
      return;
    }

    const user: UserOnLogin = JSON.parse(userData);

    if (!allowedRoles.includes(user.perfil)) {
      router.replace("/401");
    }
  }, [router, allowedRoles]);
}
