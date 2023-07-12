import {
  type GetServerSidePropsContext,
  type GetServerSidePropsResult,
} from "next";
import { getSession } from "next-auth/react";

const redirectUrl = {
  signin: "/signin",
};

type GetServerSidePropsResultType = Record<string, unknown>;
type GetServerSidePropsFuncType =
  GetServerSidePropsResult<GetServerSidePropsResultType>;

function withSession(
  getServerSidePropsFunc?: (
    context: GetServerSidePropsContext
  ) => Promise<GetServerSidePropsFuncType>
) {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsFuncType> => {
    const { req } = context;
    const session = await getSession({ req });

    if (!session && req.url !== redirectUrl.signin) {
      return {
        redirect: { destination: redirectUrl.signin, permanent: false },
      };
    }

    const propsResult: GetServerSidePropsFuncType = {
      props: {},
    };

    if (getServerSidePropsFunc) {
      const result = await getServerSidePropsFunc(context);
      Object.assign(propsResult, result);
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
