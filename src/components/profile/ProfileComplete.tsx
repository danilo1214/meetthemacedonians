import { CheckCircleIcon } from "@heroicons/react/24/solid";

export const ProfileComplete = () => {
  return (
    <div className="mx-5 my-16 flex flex-col gap-y-5">
      <div className="text-highlight-300 flex w-full justify-center">
        <CheckCircleIcon className="size-16" />
      </div>

      <div className="text-center text-xl">
        Успешно испратено барање за креирање профил
      </div>
    </div>
  );
};
