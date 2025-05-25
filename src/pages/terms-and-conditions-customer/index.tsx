// app/guest-terms/page.tsx
import Head from "next/head";
import React from "react";

const GuestTermsPage = () => {
  return (
    <>
      <Head>
        <title>Terms and conditions</title>
      </Head>
      <main className="mx-auto max-w-4xl px-6 py-12 text-gray-800">
        <h1 className="mb-6 text-3xl font-bold text-primary-600">
          Guest Terms and Conditions
        </h1>

        <p className="mb-8 text-sm text-gray-500">
          Effective Date: {new Date().toDateString()}
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">1. Booking Eligibility</h2>
            <ul className="list-disc pl-6">
              <li>
                You must be at least 18 years old or accompanied by a
                responsible adult.
              </li>
              <li>
                Bookings must be made through the official *Meet the
                Macedonians* platform.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              2. Experience Expectations
            </h2>
            <ul className="list-disc pl-6">
              <li>
                You are visiting a real family’s home—please be respectful and
                courteous.
              </li>
              <li>
                The experience includes a home-cooked Macedonian meal and
                cultural conversation.
              </li>
              <li>
                Dietary restrictions must be communicated during the booking
                process.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">3. Respect and Behavior</h2>
            <ul className="list-disc pl-6">
              <li>Respect the host home, customs, and privacy.</li>
              <li>
                No aggressive, inappropriate, or offensive behavior will be
                tolerated.
              </li>
              <li>Do not bring weapons or illegal substances.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              4. Cancellations and Refunds
            </h2>
            <ul className="list-disc pl-6">
              <li>
                Cancellations made 48+ hours before the event are eligible for a
                full refund.
              </li>
              <li>No refunds for no-shows or late cancellations.</li>
              <li>
                If a host cancels, you will receive a full refund or option to
                rebook.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">5. Photos and Reviews</h2>
            <ul className="list-disc pl-6">
              <li>
                You may take photos, but please ask permission before
                photographing hosts.
              </li>
              <li>
                You may leave a review after your visit, which will be public.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">6. Safety and Liability</h2>
            <ul className="list-disc pl-6">
              <li>
                All experiences are hosted in private homes. You participate at
                your own risk.
              </li>
              <li>
                *Meet the Macedonians* is not responsible for personal injury,
                loss, or damage during your visit.
              </li>
              <li>
                If you feel unsafe, leave the experience and contact us
                immediately.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">7. Privacy and Conduct</h2>
            <ul className="list-disc pl-6">
              <li>
                Your personal information will be used only for booking and
                safety purposes.
              </li>
              <li>You may not use host information for any other purpose.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">8. Agreement</h2>
            <p>
              By booking an experience with *Meet the Macedonians*, you agree to
              these terms and commit to being a respectful, open-minded guest
              who values authentic cultural exchange.
            </p>
          </div>
        </section>

        <p className="mt-10 text-center font-semibold italic text-primary-600">
          Come as a traveler, leave as a friend.
        </p>
      </main>
    </>
  );
};

export default GuestTermsPage;
