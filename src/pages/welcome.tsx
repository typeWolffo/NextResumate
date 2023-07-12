import { withSession } from "@/HOC";
import { userRoles } from "@/constants/roles";
import { type UserRole } from "@/types/User";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Welcome() {
  const router = useRouter();
  const { mutate } = api.user.updateUserRole.useMutation({
    onSuccess: () => {
      void router.push("/");
    },
  });

  const { data: session } = useSession();

  if (!session) return null;

  const handleRoleClick = (role: UserRole) => {
    mutate({ role: role, id: session.user.id });
  };

  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2">
      {userRoles.map((role, index) => (
        <button
          className="min-w-[130px] rounded border-2 border-brand-primary py-6 text-brand-primary-600 transition-colors hover:bg-brand-primary hover:text-white"
          key={index}
          onClick={() => handleRoleClick(role)}
        >
          {role}
        </button>
      ))}
    </div>
  );
}

export default Welcome;

export const getServerSideProps = withSession();
