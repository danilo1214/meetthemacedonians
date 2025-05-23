import { signIn } from "next-auth/react";
import { Button } from "~/components/generic/Button";

export const SignInButton = () => {
  return (
    <Button
      label="Become a host"
      onClick={() => signIn()}
      className="p-2 text-center"
    />
  );
};
