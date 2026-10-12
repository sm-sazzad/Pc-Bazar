import React from "react";
import { IProduct } from "./AllProduct";
import Link from "next/link";

const PriceUp = async () => {
  const res = await fetch(
    "https://better-auth-backend-kappa.vercel.app/api/products",
  );
  const resData: IProduct[] = await res.json();
  return (
    <div className="bg-gray-50 px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-red-500">
              Market Price Update
            </p>

            <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
              📈 Price Up
            </h1>

            <p className="mt-2 text-sm text-gray-500 md:text-base">
              Products with rising prices in the market.
            </p>
          </div>

          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            {resData.filter((m) => m.trend === "up").length} Products
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {resData
            .filter((m) => m.trend === "up")
            .map((n) => (
              <Link
                key={n._id}
                href={`/product/${n.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
              >
                {/* Product Image */}
                <div className="relative flex h-52 items-center justify-center bg-gray-100 p-5">
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                    ↑ {n.trendPercent}%
                  </span>

                  <img
                    src={n.image}
                    alt={n.name}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product Information */}
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-red-500">
                    {n.brand}
                  </p>

                  <h2 className="mt-2 line-clamp-2 min-h-12 font-bold text-gray-900 transition group-hover:text-red-600">
                    {n.name}
                  </h2>

                  <p className="mt-1 text-xs capitalize text-gray-500">
                    {n.category}
                  </p>

                  {/* Price */}
                  <div className="mt-4">
                    <p className="text-xl font-extrabold text-gray-900">
                      ৳{n.currentPrice.toLocaleString("en-BD")}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Previous:{" "}
                      <span className="line-through">
                        ৳{n.previousPrice.toLocaleString("en-BD")}
                      </span>
                    </p>
                  </div>

                  {/* Price Difference */}
                  <div className="mt-3 rounded-lg bg-red-50 px-3 py-2">
                    <p className="text-sm font-semibold text-red-600">
                      ↑ Price increased by ৳
                      {(n.currentPrice - n.previousPrice).toLocaleString(
                        "en-BD",
                      )}
                    </p>
                  </div>

                  {/* Details Button */}
                  <div className="mt-4 rounded-lg bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white transition group-hover:bg-red-500">
                    View Details →
                  </div>
                </div>
              </Link>
            ))}
        </div>

        {/* Empty State */}
        {resData.filter((m) => m.trend === "up").length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <p className="text-4xl">📊</p>

            <h2 className="mt-4 text-xl font-bold text-gray-800">
              No Price Increases
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              No products with rising prices are available right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceUp;
