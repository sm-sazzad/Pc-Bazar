import Image from "next/image";
import hero from "../../public/hero1.jpg";
import { FiCpu } from "react-icons/fi";

const Hero = () => {
  return (
    <div className="overflow-hidden w-[90%] mx-auto my-10 rounded-2xl bg-slate-950 px-6 py-12 text-white md:px-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
        {/* Left Side - Content */}
        <div className="order-2 space-y-6 md:order-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            <FiCpu size={18} />
            <span>PC BAZAR — YOUR TECH STORE</span>
          </div>

          <h2 className="text-sm font-bold tracking-[0.25em] text-cyan-400 sm:text-base">
            YOUR ULTIMATE TECH DESTINATION
          </h2>

          <h1 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Build Your
            <br />
            Dream PC<span className="text-blue-500">.</span>
            <br />
            <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Power Your World.
            </span>
          </h1>

          <p className="max-w-lg text-base leading-7 text-slate-400 sm:text-lg">
            Discover high-performance PC components, gaming accessories, and the
            latest tech at great prices. Everything you need to upgrade your
            setup.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="group flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition duration-300 hover:-translate-y-1 hover:bg-blue-500">
              Shop Now
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>

            <button className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 font-semibold text-white transition duration-300 hover:border-blue-500 hover:bg-slate-800">
              Explore Products
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-800 pt-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <FiCpu className="text-blue-400" />
              Premium Components
            </span>

            <span className="flex items-center gap-2">
              <span className="text-lg text-purple-400">✦</span>
              Built for Performance
            </span>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative order-1 flex items-center justify-center md:order-2">
          {/* Background Glow */}
          <div className="absolute h-64 w-64 rounded-full bg-blue-600/20 blur-[100px] sm:h-80 sm:w-80" />
          <div className="absolute right-5 bottom-10 h-48 w-48 rounded-full bg-purple-600/20 blur-[80px]" />

          {/* Decorative Badge */}
          <div className="absolute top-3 left-2 z-10 rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 shadow-xl backdrop-blur-md sm:left-0">
            <p className="text-xs tracking-wider text-slate-400">PERFORMANCE</p>
            <p className="font-bold text-cyan-400">UNLEASHED ⚡</p>
          </div>

          <Image
            src={hero}
            alt="Premium RGB gaming PC with high-performance components"
            width={1000}
            height={1000}
            priority
            className="relative z-0 h-auto w-full max-w-xl object-contain drop-shadow-[0_0_35px_rgba(59,130,246,0.2)] transition duration-500 hover:scale-105"
          />

          {/* Bottom Badge */}
          <div className="absolute right-1 bottom-4 z-10 rounded-xl border border-purple-400/20 bg-slate-900/90 px-4 py-3 shadow-xl backdrop-blur-md sm:right-0">
            <p className="text-xs text-slate-400">YOUR NEXT UPGRADE</p>
            <p className="font-semibold text-purple-400">
              Starts Here <span className="text-white">↗</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
