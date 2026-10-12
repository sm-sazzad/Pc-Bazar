"use client";

import { useState } from "react";
import { IProduct } from "./AllProduct";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchPage({ resData }: { resData: IProduct[] }) {
  const [q, setQ] = useState<string>("");
  //   const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const filteredData = resData.filter((n) => {
    return (
      q !== "" &&
      (n.name.toLowerCase().includes(q.toLowerCase()) ||
        n.brand.toLowerCase().includes(q.toLowerCase()) ||
        n.category.toLowerCase().includes(q.toLowerCase()))
    );
  });

  //   console.log(resData);
  console.log(filteredData.length);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">Search Products</h1>

      <p className="my-2 text-gray-500">Find your favorite products.</p>
      <div className="p-6 rounded-lg bg-white shadow my-5">
        <form
          action=""
          className="flex gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            //   setSearch(q);
            //   router.push(`/search?q=${encodeURIComponent(q)}`);
          }}
        >
          <input
            onChange={(e) => setQ(e.target.value)}
            type="search"
            name="q"
            placeholder="Search products..."
            className="w-full rounded-lg border px-4 py-3 outline-none bg-[#f9fafb]"
          />

          <button
            type="submit"
            className="px-5 py-2 bg-blue-700 rounded-lg font-bold text-white cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
      <div className=" bg-gray-50 py-8 ">
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Search Results
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
              Find Your Product
            </h1>

            <p className="mt-2 text-gray-500">
              {filteredData.length} products found
            </p>
          </div>

          {/* Products */}
          {filteredData.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-20 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-4xl">
                🔍
              </div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                No Products Found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                We couldn't find any products matching your search. Try another
                product name or brand.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredData.map((n) => {
                const discount =
                  n.previousPrice > n.currentPrice
                    ? Math.round(
                        ((n.previousPrice - n.currentPrice) / n.previousPrice) *
                          100,
                      )
                    : 0;

                return (
                  <Link
                    href={`/product/${n.slug}`}
                    key={n._id}
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                  >
                    {/* Image */}
                    <div className="relative flex h-56 items-center justify-center bg-gray-50 p-5">
                      {discount > 0 && (
                        <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                          {discount}% OFF
                        </span>
                      )}

                      <img
                        src={n.image}
                        alt={n.name}
                        className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                          {n.brand}
                        </span>

                        <span className="rounded-md bg-gray-100 px-2 py-1 text-xs capitalize text-gray-600">
                          {n.category}
                        </span>
                      </div>

                      <h2 className="mt-3 line-clamp-2 min-h-12 font-bold leading-6 text-gray-900 transition group-hover:text-blue-600">
                        {n.name}
                      </h2>

                      <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                        {n.description}
                      </p>

                      {/* Price */}
                      <div className="mt-4 border-t border-gray-100 pt-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-2xl font-extrabold text-gray-900">
                            ৳{n.currentPrice.toLocaleString("en-BD")}
                          </span>

                          {n.previousPrice > n.currentPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              ৳{n.previousPrice.toLocaleString("en-BD")}
                            </span>
                          )}
                        </div>

                        <p
                          className={`mt-2 text-xs font-semibold ${
                            n.trend === "down"
                              ? "text-green-600"
                              : n.trend === "up"
                                ? "text-red-500"
                                : "text-gray-500"
                          }`}
                        >
                          {n.trend === "down"
                            ? `↓ Price down ${n.trendPercent}%`
                            : n.trend === "up"
                              ? `↑ Price up ${n.trendPercent}%`
                              : "Price unchanged"}
                        </p>
                      </div>

                      {/* Button */}
                      <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition group-hover:bg-blue-600">
                        View Details
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
