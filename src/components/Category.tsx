import React from "react";
import { Root } from "./Navbar";
import Link from "next/link";
import { FaArrowUp } from "react-icons/fa";

const Category = async () => {
  const res = await fetch(
    "https://better-auth-backend-kappa.vercel.app/api/categories",
  );
  const resData: Root = await res.json();

  return (
    <div className="mx-auto my-16 w-[90%] max-w-7xl">
      {/* Section Heading */}
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-bold tracking-[0.25em] text-blue-500">
          EXPLORE OUR COLLECTION
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          Shop by <span className="text-blue-600">Category</span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
          Find the perfect components for your next build. Explore premium PC
          hardware and gaming accessories.
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {resData.map((n) => (
          <Link
            key={n._id}
            href={`/category/${n.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 sm:p-8"
          >
            {/* Background Glow */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl transition-all duration-300 group-hover:bg-blue-500/15" />

            <div className="relative flex items-center justify-between gap-4">
              {/* Icon */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-3xl transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/25">
                {n.icon}
              </div>

              {/* Arrow */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                <span className="transition-transform duration-300 rotate-50 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <FaArrowUp className="text-stone-700 group-hover:text-white" />
                </span>
              </div>
            </div>

            {/* Category Name */}
            <div className="relative mt-6">
              <h2 className="text-xl font-bold text-slate-800 transition-colors group-hover:text-blue-600 sm:text-2xl">
                {n.name}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Explore our collection
              </p>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-blue-600 to-purple-500 transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
