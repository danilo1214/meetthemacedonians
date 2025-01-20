import { CheckCircleIcon } from "@heroicons/react/24/solid";

export const ProfileComplete = () => {
  return (
    <div className="mx-5 my-10 flex flex-col gap-y-5">
      <div className="flex w-full justify-center text-highlight-300">
        <CheckCircleIcon className="h-36 w-36" />
      </div>

      <div className="text-center text-xl">
        Успешно испратено барање за креирање профил
      </div>
    </div>
  );
};
