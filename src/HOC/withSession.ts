import {
  type GetServerSidePropsContext,
  type GetServerSidePropsResult,
} from "next";
import { getSession } from "next-auth/react";

const redirectUrl = {
  signin: "/signin",
  welcome: "/welcome",
};

function withSession(
  getServerSidePropsFunc?: (
    context: GetServerSidePropsContext
  ) => Promise<GetServerSidePropsResult<{ [key: string]: unknown }>>
) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<{ [key: string]: unknown }>> => {
    const { req } = context;
    const session = await getSession({ req });

    if (!session && req.url !== redirectUrl.signin) {
      return {
        redirect: { destination: redirectUrl.signin, permanent: false },
      };
    }

    if (!session?.user.role && req.url !== redirectUrl.welcome) {
      return {
        redirect: {
          destination: redirectUrl.welcome,
          permanent: false,
        },
      };
    }

    let propsResult: GetServerSidePropsResult<Record<string, unknown>> = {
      props: {},
    };

    if (getServerSidePropsFunc) {
      propsResult = await getServerSidePropsFunc(context);
    }

    if ("props" in propsResult && !("then" in propsResult.props)) {
      return {
        ...propsResult,
        props: {
          ...propsResult.props,
          session: session,
        },
      };
    }
    return propsResult;
  };
}

export default withSession;
