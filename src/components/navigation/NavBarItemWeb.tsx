import Link from "next/link";
import { type NavigationItem } from "~/components/navigation/NavBar";

export const NavBarItemWeb = ({ item }: { item: NavigationItem }) => {
  return (
    <li className="nav__item px-1">
      <Link href={item.link}>
        <div className="text-textPrimary-800 hover:text-textPrimary-900 dark:text-textPrimary-100 dark:hover:text-textPrimary-300 inline-block rounded-md px-4 py-2 font-normal no-underline focus:outline-none">
          {item.label}
        </div>
      </Link>
    </li>
  );
};
