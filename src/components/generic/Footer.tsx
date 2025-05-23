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
    <footer
      className={classNames("mt-12 bg-gray-900 py-6", GeistSans.className)}
    >
      <div className="container mx-auto text-center">
        <p className="text-lg text-gray-200">Contact Us</p>
        <p className="text-gray-400">help@meetthemacedonians.com</p>
        <div className="mt-6">
          <p className="text-lg text-gray-200">Follow Us</p>
          <div className="mt-2 flex justify-center gap-6">
            <a
              href="#"
              aria-label="Twitter"
              className="text-blue-400 hover:text-blue-600"
            >
              <FontAwesomeIcon icon={faTwitter} width={20} height={20} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-pink-500 hover:text-pink-700"
            >
              <FontAwesomeIcon icon={faInstagram} width={20} height={20} />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="text-white hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faTiktok} width={20} height={20} />
            </a>
          </div>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Meet The Macedonians. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};
