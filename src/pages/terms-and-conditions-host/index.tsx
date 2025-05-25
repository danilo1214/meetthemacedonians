// app/host-terms/page.tsx
import Head from "next/head";
import React from "react";

const HostTermsPage = () => {
  return (
    <>
      <Head>
        <title>Terms and conditions</title>
      </Head>
      <main className="mx-auto max-w-4xl px-6 py-12 text-gray-800">
        <h1 className="mb-6 text-3xl font-bold text-primary-600">
          Host Terms and Conditions
        </h1>

        <p className="mb-8 text-sm text-gray-500">
          Effective Date: {new Date().toDateString()}
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">1. Eligibility</h2>
            <ul className="list-disc pl-6">
              <li>Hosts must be 18 years or older.</li>
              <li>
                Hosts must have legal authority to host guests in their
                residence.
              </li>
              <li>
                Hosts are responsible for ensuring compliance with all local
                laws, health codes, and housing regulations.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">2. Experience Standards</h2>
            <ul className="list-disc pl-6">
              <li>Provide a clean, safe, and welcoming environment.</li>
              <li>Serve a home-cooked Macedonian-style meal.</li>
              <li>
                Basic English is preferred; translation support is a bonus.
              </li>
              <li>Promote cultural connection and warm conversation.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">3. Safety and Conduct</h2>
            <ul className="list-disc pl-6">
              <li>No unsafe, discriminatory, or offensive behavior.</li>
              <li>
                Alcohol is permitted only with mutual consent and legal age.
              </li>
              <li>No weapons or illegal substances allowed.</li>
              <li>Report emergencies or incidents promptly.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">4. Guest Interaction</h2>
            <ul className="list-disc pl-6">
              <li>Show respect and hospitality to all guests.</li>
              <li>
                No coercion in political, religious, or commercial topics.
              </li>
              <li>Physical contact must be appropriate and consensual.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              5. Payments and Cancellations
            </h2>
            <ul className="list-disc pl-6">
              <li>Payments are handled through our secure platform.</li>
              <li>Honor bookings unless emergencies arise.</li>
              <li>Late cancellations may result in removal.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">6. Photos and Reviews</h2>
            <ul className="list-disc pl-6">
              <li>
                Guests may take photos; hosts may opt out of being photographed.
              </li>
              <li>Public reviews will be visible to other travelers.</li>
              <li>
                Non-identifying content may be used for promotional purposes
                unless opted out.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">7. Privacy and Data</h2>
            <ul className="list-disc pl-6">
              <li>Do not collect or misuse guest data.</li>
              <li>Handle all shared data with strict confidentiality.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">8. Termination</h2>
            <p>
              We reserve the right to suspend or remove any host that violates
              these terms or jeopardizes guest safety or experience quality.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">9. Liability</h2>
            <p>
              Hosts participate at their own risk. Meet the Macedonians is not
              responsible for injury, loss, or damage incurred during any
              experience.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">10. Agreement</h2>
            <p>
              By hosting through our platform, you agree to these terms and
              commit to providing genuine Macedonian hospitality and a safe,
              enriching experience for guests.
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

export default HostTermsPage;
