import { signIn } from "next-auth/react";
import { Button } from "~/components/generic/Button";

export const SignInButton = () => {
  return (
    <Button
      label="Become a host"
      onClick={() => signIn()}
      className="bg-primary-500 p-2 text-center text-sm text-white shadow-xl hover:bg-primary-400"
    />
  );
};
