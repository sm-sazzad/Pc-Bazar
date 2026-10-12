import { IProduct } from "./AllProduct";
import Link from "next/link";

const DropPrice = async () => {
  const res = await fetch(
    "https://better-auth-backend-kappa.vercel.app/api/products",
  );
  const resData: IProduct[] = await res.json();
  return (
    <div className=" mx-auto w-[90%] py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Best Deals For You
            </p>

            <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
              🎯 Price Drops
            </h1>

            <p className="mt-2 text-sm text-gray-500 md:text-base">
              Grab your favorite products at better prices.
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {resData.length} Products
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {resData
            .filter((m) => m.trend === "down")
            .map((n) => {
              const discount =
                n.previousPrice > n.currentPrice
                  ? Math.round(
                      ((n.previousPrice - n.currentPrice) / n.previousPrice) *
                        100,
                    )
                  : 0;

              return (
                <Link
                  key={n._id}
                  href={`/product/${n.slug}`}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative flex h-52 items-center justify-center bg-gray-50 p-5">
                    {discount > 0 && (
                      <span className="absolute left-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                        -{discount}% OFF
                      </span>
                    )}

                    <img
                      src={n.image}
                      alt={n.name}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      {n.brand}
                    </p>

                    <h2 className="mt-2 line-clamp-2 min-h-12 font-bold text-gray-900 transition group-hover:text-blue-600">
                      {n.name}
                    </h2>

                    <p className="mt-1 text-xs capitalize text-gray-500">
                      {n.category}
                    </p>

                    {/* Price */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="text-xl font-extrabold text-gray-900">
                        ৳{n.currentPrice.toLocaleString("en-BD")}
                      </span>

                      {n.previousPrice > n.currentPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ৳{n.previousPrice.toLocaleString("en-BD")}
                        </span>
                      )}
                    </div>

                    {/* Price Trend */}
                    <div className="mt-3 flex items-center gap-1 text-xs">
                      {n.trend === "down" ? (
                        <span className="font-semibold text-green-600">
                          ↓ Price is dropping
                        </span>
                      ) : n.trend === "up" ? (
                        <span className="font-semibold text-red-500">
                          ↑ Price is rising
                        </span>
                      ) : (
                        <span className="text-gray-500">Price unchanged</span>
                      )}
                    </div>

                    {/* Button */}
                    <div className="mt-4 rounded-lg bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white transition group-hover:bg-blue-600">
                      View Details →
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>

        {/* Empty State */}
        {resData.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <p className="text-4xl">🎯</p>
            <h2 className="mt-4 text-xl font-bold text-gray-800">
              No Price Drops Yet
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Check back later for exciting deals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropPrice;
