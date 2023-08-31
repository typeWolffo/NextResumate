import Carousel from "@/components/Carousel/Carousel";
import { motion } from "framer-motion";
import { type GetServerSidePropsContext } from "next";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import Image from "next/image";
import tailwindConfig from "tailwind.config";

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

const SignIn = ({ providers }: SignInProps) => {
  return (
    <div className="flex h-screen w-screen gap-8 bg-neutral-200 p-8">
      <div className="relative w-1/2 overflow-hidden rounded-2xl bg-white p-20 shadow-100">
        <span className="absolute z-0 -translate-x-44 translate-y-16 whitespace-nowrap text-[200px] font-semibold leading-tight tracking-[2px] text-neutral-200/30">
          Manage Candidates
        </span>

        <div className="relative z-10 flex h-full flex-col justify-between">
          <Image
            src="/images/selleo-logo.svg"
            width={120}
            height={40}
            alt="logo"
          />

          <div>
            <p className="mb-2 text-base font-semibold uppercase leading-tight tracking-kicker text-neutral-400">
              Resumate
            </p>

            <h2 className="mb-6 text-xxxl font-semibold leading-tight">
              Our new way of&nbsp;
              <span className="block text-brand-primary">
                manage candidates
              </span>
            </h2>

            <p className="mb-16 w-7/12 text-md text-neutral-500">
              The application assigns you the appropriate role in the system and
              helps you in your tasks.
            </p>

            {Object.values(providers).map((provider) => (
              <motion.button
                key={provider.name}
                onClick={() => void signIn(provider.id)}
                className="flex w-7/12 items-center justify-center gap-2 rounded-full border py-4"
                initial={{
                  scale: 1,
                  borderColor: tailwindConfig.theme.extend.colors.black,
                }}
                whileHover={{
                  scale: 1.05,
                  borderColor:
                    tailwindConfig.theme.extend.colors.brand.primary[500],
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={`/icons/${provider.name}-logo.svg`}
                  width={20}
                  height={20}
                  alt={provider.name}
                />
                <span className="font-semibold leading-[175%] text-black transition-colors">
                  Login with {provider.name}
                </span>
              </motion.button>
            ))}
          </div>

          <p className="text-sm tracking-[.14px] text-neutral-600">
            This service is restricted to authorized users only. All activities
            on this system are logged.
          </p>
        </div>
      </div>

      <div className="w-1/2 rounded-2xl bg-white shadow-100">
        <Carousel
          images={[
            "/images/office1.jpg",
            "/images/office2.jpg",
            "/images/office3.jpg",
          ]}
        />
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
