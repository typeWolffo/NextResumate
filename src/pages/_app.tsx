import { Layout } from "@/components";
import {
  FilterContext,
  ManagedUIProvider,
  UserRoleUpdateProvider,
} from "@/contexts";
import "@/styles/globals.css";
import { api } from "@/utils/api";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <UserRoleUpdateProvider>
        <Layout>
          <FilterContext>
            <ManagedUIProvider>
              <Component {...pageProps} />
            </ManagedUIProvider>
          </FilterContext>
        </Layout>
      </UserRoleUpdateProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
