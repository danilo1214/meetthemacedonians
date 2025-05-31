import Link from "next/link";
import { SignInButton } from "~/components/navigation/SignInButton";

export const BecomeAHost = () => {
  return (
    <div className="w-full bg-primary-900 px-6 py-12 text-center text-white">
      <div className="mb-3 text-xl font-semibold md:text-3xl">
        How Does It Work?
      </div>

      <p className="text-md mx-auto mb-2 max-w-3xl text-primary-100 md:text-xl lg:mb-4">
        Hosting is simple. Open your home, cook a traditional meal, and share
        your story. We’ll match you with respectful travelers looking for a real
        cultural experience.
      </p>

      <Link
        href="/get-started"
        className="inline-block rounded-full bg-white px-6 py-2 text-sm font-semibold text-primary-900 shadow-md transition hover:bg-primary-100"
      >
        Become a Host
      </Link>

      <p className="text-md mx-auto mt-5 max-w-3xl italic text-primary-200 lg:mt-4">
        Get paid to share your culture, make new friends, and help the world
        fall in love with Macedonia.
      </p>
    </div>
  );
};
