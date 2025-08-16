import { Button } from "../generic/Button";

export function Hero() {
  return (
    <section className="relative bg-primary-500 px-6 py-24 text-center text-white">
      <h1 className="mb-4 text-4xl font-bold md:text-6xl">
        Store your luggage. Explore freely.
      </h1>
      <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90 md:text-xl">
        Book secure luggage storage in trusted local shops, hotels, and cafés.
      </p>
      <Button
        label="Find Storage Near Me"
        className="rounded-full bg-white px-8 font-semibold text-primary-500 shadow-md hover:bg-gray-100"
      />
    </section>
  );
}
