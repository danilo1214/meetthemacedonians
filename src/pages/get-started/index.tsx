import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "~/components/generic/Button";
import { authConfig } from "~/server/auth/config";

export const GetStarted = () => {
  return (
    <div className="bg-slate grid h-screen lg:grid-cols-12">
      <div className="col-span-5 hidden content-center items-center p-10 lg:block">
        <Image src="/app-2.png" width={600} height={400} alt="hh" />
      </div>

      <div className="col-span-7 flex items-center justify-center gap-4 px-8 py-16">
        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col items-center gap-y-5 px-5 py-10 shadow">
            <div className="flex gap-x-2">
              <Image
                loading="lazy"
                alt="logo"
                width={20}
                height={20}
                src="/logo.png"
              />
              <h2 className="text-textPrimary-900 text-lg font-semibold">
                Meet The Macedonians
              </h2>
            </div>

            <Button
              className="rounded bg-primary-600 px-0 text-white shadow"
              onClick={() => signIn()}
              label="Креирај профил"
            />
          </div>

          <p>
            Со креирање на профил се согласувате на нашите услови на користење.
          </p>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  if (req && res) {
    return {
      props: {
        session: await getServerSession(req, res, authConfig),
      },
    };
  }

  return {};
}

export default GetStarted;
