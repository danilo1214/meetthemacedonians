import classNames from "classnames";
import { GeistSans } from "geist/font/sans";
import { type NextComponentType, type NextPageContext } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Navbar from "~/components/navigation/NavBar";

export const Main = ({
  Component,
  ...pageProps
}: {
  Component: NextComponentType<NextPageContext>;
}) => {
  const session = useSession();

  if (session.status === "loading") {
    return (
      <div className="bg-primary-600 flex h-[100vh] w-full content-center items-center justify-center">
        <Image
          loading="lazy"
          alt="logo"
          width={100}
          height={100}
          src="/logo.png"
          className="animate-bounce"
        />
      </div>
    );
  }

  return (
    <>
      <Navbar className={GeistSans.className} />
      <main className={GeistSans.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
};
