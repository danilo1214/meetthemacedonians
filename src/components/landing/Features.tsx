import {
  ShieldCheckIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

const features = [
  {
    title: "Safe & Secure",
    desc: "Every partner location is verified and insured.",
    icon: <ShieldCheckIcon className="h-10 w-10 text-primary-500" />,
  },
  {
    title: "Affordable",
    desc: "Flat daily rates with no hidden fees.",
    icon: <CurrencyDollarIcon className="h-10 w-10 text-primary-500" />,
  },
  {
    title: "Everywhere",
    desc: "Available in shops, hotels, and cafés worldwide.",
    icon: <GlobeAltIcon className="h-10 w-10 text-primary-500" />,
  },
];

export function Features() {
  return (
    <section className="px-6 py-20">
      <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Us</h2>
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
        {features.map((f, i) => (
          <div
            key={i}
            className="rounded-2xl bg-gray-50 p-8 text-center shadow-sm"
          >
            <div className="mb-4 flex justify-center">{f.icon}</div>
            <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
