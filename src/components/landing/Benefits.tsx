const benefits = [
  { title: "Safe & Secure", desc: "Your bags are sealed and insured." },
  { title: "Affordable", desc: "Flat daily pricing, no hidden fees." },
  { title: "Trusted Locations", desc: "Hotels, cafes & shops you can trust." },
  { title: "24/7 Support", desc: "We’re here whenever you need us." },
];

export const Benefits = () => {
  return (
    <section className="bg-gray-50 py-16 text-center">
      <h2 className="mb-10 text-2xl font-bold">Why Travelers Love Us</h2>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-4">
        {benefits.map((b, i) => (
          <div
            key={i}
            className="rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h3 className="mb-2 text-lg font-semibold">{b.title}</h3>
            <p className="text-gray-600">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
