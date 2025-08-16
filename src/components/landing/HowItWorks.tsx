import {
  MapPinIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

const steps = [
  {
    title: "Find a Location",
    icon: <MapPinIcon className="h-10 w-10 text-primary-500" />,
    desc: "Search nearby luggage storage spots in seconds.",
  },
  {
    title: "Book Online",
    icon: <CreditCardIcon className="h-10 w-10 text-primary-500" />,
    desc: "Reserve instantly with secure online payment.",
  },
  {
    title: "Drop Your Bags",
    icon: <ShoppingBagIcon className="h-10 w-10 text-primary-500" />,
    desc: "Check in your bags at the partner location.",
  },
  {
    title: "Enjoy the City",
    icon: <ClockIcon className="h-10 w-10 text-primary-500" />,
    desc: "Explore hands-free while your bags are safe.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-gray-50 px-6 py-20">
      <h2 className="mb-12 text-center text-3xl font-bold">How it Works</h2>
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg"
          >
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="mb-2 text-center text-xl font-semibold">
              {i + 1}. {step.title}
            </h3>
            <p className="text-center text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
