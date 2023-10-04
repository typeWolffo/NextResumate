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
import { Toaster } from "sonner";
import { type NextPage } from "next";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const ComponentWithTypedProps: NextPage = Component as NextPage;

  return (
    <SessionProvider session={session}>
      <UserRoleUpdateProvider>
        <Layout>
          <FilterContext>
            <ManagedUIProvider>
              <ComponentWithTypedProps {...pageProps} />
              <Toaster richColors />
            </ManagedUIProvider>
          </FilterContext>
        </Layout>
      </UserRoleUpdateProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
