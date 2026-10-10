import { IProduct } from "@/components/AllProduct";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaExternalLinkAlt, FaShoppingCart } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const res = await fetch(
    `https://better-auth-backend-kappa.vercel.app/api/products/${slug}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const resData: IProduct = await res.json();

  const {
    _id,
    name,
    brand,
    category,
    currentPrice,
    previousPrice,
    trend,
    trendPercent,
    image,
    unit,
    description,
    specs,
    stores,
    priceHistory,
  } = resData;

  const priceDifference = currentPrice - previousPrice;
  const lowestPrice = Math.min(...stores.map((store) => store.price));

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-blue-600"
        >
          <FaArrowLeft />
          Back to Home
        </Link>

        {/* Product Overview */}
        <section className="grid gap-8 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">
          {/* Product Image */}
          <div className="flex min-h-80 items-center justify-center rounded-xl md:min-h-112.5">
            <div className="relative h-full w-full md:h-96">
              <Image
                src={image}
                alt={name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                {brand}
              </span>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-700">
                {category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
              {name}
            </h1>

            <p className="mt-4 leading-7 text-gray-600">{description}</p>

            {/* Product ID */}
            <div className="mt-4 space-y-2 text-sm text-gray-500">
              <p>
                <span className="font-medium text-gray-700">Product ID:</span>{" "}
                <span className="break-all">{_id}</span>
              </p>

              <p>
                <span className="font-medium text-gray-700">Slug:</span>{" "}
                {resData.slug}
              </p>
            </div>

            {/* Price */}
            <div className="mt-6 border-y border-gray-200 py-5">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ৳{currentPrice.toLocaleString("en-BD")}
                </span>

                <span className="text-sm text-gray-500">{unit}</span>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Previous Price:{" "}
                <span className="line-through">
                  ৳{previousPrice.toLocaleString("en-BD")}
                </span>
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${
                    trend === "up"
                      ? "bg-red-100 text-red-700"
                      : trend === "down"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {trend === "up" ? (
                    <FaArrowTrendUp />
                  ) : trend === "down" ? (
                    <FaArrowTrendDown />
                  ) : null}
                  Trend: {trend}
                </span>

                <span className="text-sm font-semibold text-gray-700">
                  {trend === "up" ? "+" : trend === "down" ? "-" : ""}
                  {trendPercent}%
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-600">
                {priceDifference > 0
                  ? `Previous price থেকে ৳${priceDifference.toLocaleString("en-BD")} বেশি`
                  : priceDifference < 0
                    ? `Previous price থেকে ৳${Math.abs(priceDifference).toLocaleString("en-BD")} কম`
                    : "Previous price-এর সমান"}
              </p>
            </div>

            {/* Shop Now */}
            {stores.length > 0 && (
              <a
                href={stores[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                <FaShoppingCart />
                Shop Now at {stores[0].name}
                <FaExternalLinkAlt className="text-xs" />
              </a>
            )}
          </div>
        </section>

        {/* Specifications */}
        <section className="mt-10 rounded-2xl bg-white p-5 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Technical Specifications
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(specs).map(([key, value]) => (
              <div key={key} className="rounded-xl border border-gray-200 p-4">
                <p className="text-sm capitalize text-gray-500">{key}</p>
                <p className="mt-2 wrap-break-word font-semibold text-gray-900">
                  {value || "Not available"}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Store Price Comparison */}
        <section className="mt-10 rounded-2xl bg-white p-5 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Compare Store Prices
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            বিভিন্ন store-এর price তুলনা করে সেরা deal বেছে নাও।
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stores.map((store, index) => (
              <div
                key={`${store.name}-${index}`}
                className="rounded-xl border border-gray-200 p-5 transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-gray-900">{store.name}</h3>

                  {store.price === lowestPrice && (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                      Lowest Price
                    </span>
                  )}
                </div>

                <p className="mt-4 text-2xl font-bold text-gray-900">
                  ৳{store.price.toLocaleString("en-BD")}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {store.price > currentPrice
                    ? `Current price থেকে ৳${(store.price - currentPrice).toLocaleString("en-BD")} বেশি`
                    : store.price < currentPrice
                      ? `Current price থেকে ৳${(currentPrice - store.price).toLocaleString("en-BD")} কম`
                      : "Current price-এর সমান"}
                </p>

                <a
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                  Visit {store.name}
                  <FaExternalLinkAlt />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Price History */}
        <section className="mt-10 rounded-2xl bg-white p-5 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-gray-900">Price History</h2>

          <p className="mt-2 text-sm text-gray-500">
            সময়ের সঙ্গে product-এর price কীভাবে পরিবর্তন হয়েছে।
          </p>

          {priceHistory.length > 0 ? (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-125 text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="px-4 py-3 font-semibold text-gray-700">
                      Price Change
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {priceHistory.map((item, index) => {
                    const previousRecord = priceHistory[index - 1];

                    const difference = previousRecord
                      ? item.price - previousRecord.price
                      : null;

                    return (
                      <tr
                        key={`${item.date}-${index}`}
                        className="border-b border-gray-100 last:border-0"
                      >
                        <td className="px-4 py-4 text-gray-600">{item.date}</td>

                        <td className="px-4 py-4 font-semibold text-gray-900">
                          ৳{item.price.toLocaleString("en-BD")}
                        </td>

                        <td className="px-4 py-4">
                          {difference === null ? (
                            <span className="text-gray-400">First record</span>
                          ) : difference > 0 ? (
                            <span className="font-medium text-red-600">
                              +৳{difference.toLocaleString("en-BD")}
                            </span>
                          ) : difference < 0 ? (
                            <span className="font-medium text-green-600">
                              -৳{Math.abs(difference).toLocaleString("en-BD")}
                            </span>
                          ) : (
                            <span className="text-gray-500">No change</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-5 rounded-lg bg-gray-50 p-5 text-gray-500">
              No price history available.
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default page;
