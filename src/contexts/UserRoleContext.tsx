import { env } from "@/env.mjs";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { createContext, useEffect, type ReactNode } from "react";

const UserRoleUpdateContext = createContext(null);

function UserRoleUpdateProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const { mutate } = api.user.updateUserRole.useMutation();

  useEffect(() => {
    if (session?.user.role) return;

    if (session?.user?.email && session?.user?.role !== "ADMIN") {
      const isMasterAdmin =
        env.NEXT_PUBLIC_MASTER_ADMIN_EMAIL === session.user.email;

      if (isMasterAdmin) {
        mutate({ email: session.user.email, role: "ADMIN" });
        return;
      }

      mutate({ email: session.user.email, role: "REVIEWER" });
    }
  }, [session, mutate]);

  return (
    <UserRoleUpdateContext.Provider value={null}>
      {children}
    </UserRoleUpdateContext.Provider>
  );
}

export default UserRoleUpdateProvider;
