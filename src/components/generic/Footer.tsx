import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import classNames from "classnames";
import { GeistSans } from "geist/font/sans";

export const Footer = () => {
  return (
    <footer className={classNames("bg-gray-50 py-10", GeistSans.className)}>
      <div className="container mx-auto flex flex-col items-center gap-3 px-4 text-center">
        <div>
          <h2 className="font-semibold text-gray-700">Contact Us</h2>
          <p className="text-gray-900">help@meetthemacedonians.com</p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700">Follow Us</h2>
          <div className="mt-2 flex gap-6">
            <a
              href="#"
              aria-label="Twitter"
              className="text-blue-500 transition hover:text-blue-700"
            >
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-pink-500 transition hover:text-pink-700"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="text-black transition hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faTiktok} size="lg" />
            </a>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Meet The Macedonians. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};
