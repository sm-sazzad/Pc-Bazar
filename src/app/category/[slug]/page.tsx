import { IProduct } from "@/components/AllProduct";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Category = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const res = await fetch(
    `https://better-auth-backend-kappa.vercel.app/api/products?category=${slug}`,
  );
  const resData: IProduct[] = await res.json();

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Discover Your Next Gadget
          </p>

          <h1 className="text-3xl font-extrabold capitalize tracking-tight text-slate-900 sm:text-4xl">
            {slug[0].toUpperCase() + slug.slice(1)}
          </h1>

          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            See and select your favourite gadget. Explore the latest technology
            and find the right product for you.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {resData.map((n, index) => {
            const layout = index % 5;

            const cardSize =
              layout === 0
                ? "sm:col-span-2 lg:col-span-3"
                : layout === 1
                  ? "sm:col-span-2 lg:col-span-3"
                  : layout === 2
                    ? "sm:col-span-1 lg:col-span-2"
                    : layout === 3
                      ? "sm:col-span-1 lg:col-span-2"
                      : "sm:col-span-2 lg:col-span-2";

            const cardColor =
              layout === 0
                ? "bg-blue-500 text-white"
                : "bg-white text-slate-900";

            return (
              <Link
                key={n._id}
                href={`/products/${n.slug}`}
                className={`group relative flex min-h-55 overflow-hidden rounded-2xl border border-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-60 ${cardSize} ${cardColor}`}
              >
                {/* Product Image */}
                <div className="absolute inset-y-0 right-0 flex w-[52%] items-center justify-center p-3 sm:w-[48%]">
                  <Image
                    src={n.image}
                    alt={n.name}
                    width={280}
                    height={280}
                    className="h-full max-h-50 w-full object-contain transition duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Product Information */}
                <div className="relative z-10 flex w-[58%] flex-col items-start p-5 sm:p-6">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest ${
                      layout === 0 ? "text-blue-100" : "text-blue-600"
                    }`}
                  >
                    {n.brand}
                  </span>

                  <h2 className="mt-2 line-clamp-2 text-lg font-bold leading-snug sm:text-xl">
                    {n.name}
                  </h2>

                  <p
                    className={`mt-2 line-clamp-2 text-xs leading-5 sm:text-sm ${
                      layout === 0 ? "text-blue-100" : "text-slate-500"
                    }`}
                  >
                    {n.description}
                  </p>

                  <div className="mt-3">
                    <p className="text-lg font-extrabold">
                      ৳{n.currentPrice.toLocaleString("en-BD")}
                    </p>

                    {n.previousPrice > n.currentPrice && (
                      <p
                        className={`text-xs line-through ${
                          layout === 0 ? "text-blue-100" : "text-slate-400"
                        }`}
                      >
                        ৳{n.previousPrice.toLocaleString("en-BD")}
                      </p>
                    )}
                  </div>

                  <span
                    className={`mt-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition ${
                      layout === 0
                        ? "bg-white text-blue-600 group-hover:bg-blue-50"
                        : "bg-slate-100 text-slate-800 group-hover:bg-blue-600 group-hover:text-white"
                    }`}
                  >
                    Shop Now
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {resData.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-bold text-slate-800">
              No Products Found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              No products are available in this category right now. Please check
              back later.
            </p>

            <Link
              href="/"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
