import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { authConfig } from "~/server/auth/config";
import { helpers } from "~/server/helpers";

export default function Dashboard() {
  return (
    <>
      <div>hahah</div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authConfig);

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}
