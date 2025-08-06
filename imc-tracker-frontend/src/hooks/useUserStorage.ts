import { UserOnLogin } from "@/common/interfaces/auth/login.interface";
import { useEffect, useState } from "react";
import { useLogout } from "./auth/useLogout";
import { useRouter } from "next/navigation";

export function useUserStorage(): UserOnLogin | null {
  const router = useRouter();

  const [userStorage, setUserStorage] = useState<UserOnLogin | null>(null);

  function onLogoutSuccess() {
    router.replace("/");
  }

  const { mutate: logout } = useLogout(onLogoutSuccess);

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (!localUser) {
      logout();
    }

    if (localUser) {
      setUserStorage(JSON.parse(localUser));
    }
  }, [logout]);

  return userStorage;
}
