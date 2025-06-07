import classNames from "classnames";
import { GeistSans } from "geist/font/sans";
import { type NextComponentType, type NextPageContext } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { Footer } from "~/components/generic/Footer";
import Loader from "~/components/generic/Loader";
import Navbar from "~/components/navigation/NavBar";

export const Main = ({
  Component,
  ...pageProps
}: {
  Component: NextComponentType<NextPageContext>;
}) => {
  const session = useSession();

  const isBot =
    typeof window !== "undefined" &&
    /bot|crawl|spider|slurp|facebook|twitter|linkedin/i.test(
      navigator.userAgent,
    );

  if (session.status === "loading" && !isBot) {
    return (
      <div className="flex h-[100vh] w-full content-center items-center justify-center">
        <Image
          loading="lazy"
          alt="logo"
          width={400}
          height={400}
          src="/logo.png"
          className="animate-bounce"
        />
      </div>
    );
  }

  return (
    <>
      <Navbar className={GeistSans.className} />
      <Loader />
      <ToastContainer />

      <main className={classNames(GeistSans.className, "min-h-[60vh]")}>
        <Component {...pageProps} />
      </main>

      <Footer />
    </>
  );
};
