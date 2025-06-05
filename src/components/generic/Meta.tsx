import Head from "next/head";
import { useRouter } from "next/router";

interface MetaProps {
  title: string;
  description: string;
}

export const Meta = ({ title, description }: MetaProps) => {
  const router = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <link
        rel="canonical"
        href={`https://meetthemacedonians.com${router.asPath}`}
      />
      <meta name="robots" content="index, follow" />

      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://meetthemacedonians.com${router.asPath}`}
      />
      <meta
        property="og:image"
        content="https://meetthemacedonians.com/food.jpg"
      />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
