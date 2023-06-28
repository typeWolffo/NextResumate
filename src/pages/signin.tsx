import { type GetServerSidePropsContext } from "next";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import Image from "next/image";

type ProviderData = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

type Providers = Record<string, ProviderData>;

type SignInProps = {
  providers: Providers;
  csrfToken: unknown;
};

const SignIn: React.FC<SignInProps> = ({ providers }) => {
  console.log(providers);
  return (
    <div className="relative h-screen w-screen bg-slate-800">
      <Image
        src="/images/signinbg.jpeg"
        fill
        alt="office"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-y-0 right-0 z-10 w-1/2 bg-zinc-700/50">
        {Object.values(providers).map((provider) => (
          <div
            key={provider.name}
            className="absolute left-1/2 top-1/2 flex w-max -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-6 rounded bg-slate-100/80 px-20 py-16"
          >
            <Image
              src="/images/selleo-logo.svg"
              width={120}
              height={40}
              alt="logo"
            />
            <button
              onClick={() => void signIn(provider.id)}
              className="rounded-md bg-brand-primary px-4 py-2 text-white shadow-md transition-colors hover:bg-brand-primary-600 hover:shadow-lg"
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignIn;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(),
    },
  };
};
