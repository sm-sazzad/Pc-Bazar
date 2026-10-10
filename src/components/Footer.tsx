import Link from "next/link";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="mt-16 bg-slate-950 text-slate-300">
      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="inline-block text-2xl font-extrabold tracking-tight text-white"
          >
            PC <span className="text-blue-500">Bazar</span>
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
            Find the best PC components and electronics at the right price.
            Compare products, explore specifications, and make smarter buying
            decisions with PC Bazar.
          </p>

          {/* Social Links */}
          <div className="mt-6 flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 transition hover:bg-blue-600 hover:text-white"
            >
              <FaFacebookF size={17} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 transition hover:bg-pink-600 hover:text-white"
            >
              <FaInstagram size={17} />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 transition hover:bg-slate-600 hover:text-white"
            >
              <FaGithub size={17} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-white">Quick Links</h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="transition hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="transition hover:text-blue-400">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition hover:text-blue-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-blue-400">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-white">Categories</h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/products?category=laptop"
                className="transition hover:text-blue-400"
              >
                Laptops
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=phone"
                className="transition hover:text-blue-400"
              >
                Smartphones
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=monitor"
                className="transition hover:text-blue-400"
              >
                Monitors
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=cpu"
                className="transition hover:text-blue-400"
              >
                Processors
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=gpu"
                className="transition hover:text-blue-400"
              >
                Graphics Cards
              </Link>
            </li>
            <li>
              <Link
                href="/products?category=accessories"
                className="transition hover:text-blue-400"
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-white">Get in Touch</h3>

          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MdEmail className="mt-0.5 shrink-0 text-xl text-blue-400" />
              <a
                href="mailto:support@pcbazar.com"
                className="break-all transition hover:text-blue-400"
              >
                support@pcbazar.com
              </a>
            </li>

            <li className="flex items-start gap-3">
              <MdPhone className="mt-0.5 shrink-0 text-xl text-blue-400" />
              <a
                href="tel:+8801000000000"
                className="transition hover:text-blue-400"
              >
                +880 1000-000000
              </a>
            </li>

            <li className="flex items-start gap-3">
              <MdLocationOn className="mt-0.5 shrink-0 text-xl text-blue-400" />
              <span>
                Bangladesh
                <br />
                Serving tech enthusiasts everywhere.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 text-center text-sm text-slate-500 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} PC Bazar. All rights reserved.</p>

          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/privacy-policy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
