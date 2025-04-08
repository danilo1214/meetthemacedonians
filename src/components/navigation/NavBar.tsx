"use client";

import Link from "next/link";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import classNames from "classnames";
import { useBreakpoint } from "~/hooks/media";
import { useSession } from "next-auth/react";
import { UserMenu } from "~/components/navigation/UserMenu";
import { SignInButton } from "~/components/navigation/SignInButton";
import { NavBarItemWeb } from "~/components/navigation/NavBarItemWeb";
import { NavBarItemMobile } from "~/components/navigation/NavBarItemMobile";
import { HamburgerClosed } from "~/components/navigation/HamburgerClosed";
import { HamburgerOpen } from "~/components/navigation/HamburgerOpen";
import { GeistSans } from "geist/font/sans";

const navigation: NavigationItem[] = [
  { label: "Home", link: "/", protected: false },
  { label: "Резервации", link: "/dashboard", protected: true },
  { label: "Мој профил", link: "/account", protected: true },
];

export interface NavigationItem {
  label: string;
  link: string;
  protected?: boolean;
}

export default function Navbar({ ...props }) {
  const { isLargeScreen, isMediumScreen } = useBreakpoint();
  const { data, status } = useSession();

  const isSignedIn = status !== "loading" && !!data?.user;

  const protectedRoutes = navigation.filter((n) => n.protected && isSignedIn);

  return (
    <div
      className={classNames(
        "w-full bg-white shadow-sm dark:bg-primary-600",
        GeistSans.className,
      )}
    >
      <nav className="container relative mx-auto flex flex-wrap items-center justify-between px-8 py-6 lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex w-full flex-wrap items-center lg:w-auto lg:justify-between">
                <Link href="/">
                  <div className="flex items-center space-x-2 text-2xl text-primary-500">
                    Meet the Macedonians
                  </div>
                </Link>

                {isSignedIn && isMediumScreen && (
                  <UserMenu image={data?.user.image} />
                )}

                <DisclosureButton
                  aria-label="Toggle Menu"
                  className={classNames(
                    "text-textPrimary-800 hover:text-textPrimary-900 ml-5 rounded-md px-2 py-1 focus:outline-none lg:hidden dark:text-white dark:hover:text-white",
                    !isSignedIn && "ml-auto",
                  )}
                >
                  <svg
                    className="h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open && <HamburgerOpen />}
                    {!open && <HamburgerClosed />}
                  </svg>
                </DisclosureButton>

                <DisclosurePanel className="my-5 flex w-full flex-col flex-wrap text-center lg:hidden">
                  <>
                    {protectedRoutes.map((item, index) => (
                      <NavBarItemMobile item={item} key={index} />
                    ))}

                    {!isSignedIn && <SignInButton />}
                  </>
                </DisclosurePanel>
              </div>
            </>
          )}
        </Disclosure>

        {isLargeScreen && (
          <div className="ml-auto flex items-center justify-between text-center">
            <ul className="flex-1 list-none items-center justify-end pt-6 lg:flex lg:pt-0">
              {protectedRoutes.map((item, index) => (
                <NavBarItemWeb key={index} item={item} />
              ))}
            </ul>

            {data?.user && <UserMenu image={data?.user.image} />}
          </div>
        )}

        <div className="nav__item mr-3 hidden items-center space-x-3 align-middle lg:flex">
          {!data?.user && <SignInButton />}
        </div>
      </nav>
    </div>
  );
}
