import Image from "next/image";

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  currentPrice: number;
  previousPrice: number;
  trend: string;
  trendPercent: number;
  image: string;
  unit: string;
  description: string;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    camera: string;
    battery: string;
  };
  stores: {
    name: string;
    price: number;
    url: string;
  }[];
  priceHistory: {
    date: string;
    price: number;
  }[];
}

type GroupedProducts = Record<string, IProduct[]>;

const AllProduct = async () => {
  const res = await fetch(
    "https://better-auth-backend-kappa.vercel.app/api/products",
  );
  const resData: IProduct[] = await res.json();
  const groupedProducts = resData.reduce<GroupedProducts>((groups, product) => {
    const category = product.category;

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(product);

    return groups;
  }, {});

  return (
    <div className="mx-auto w-[95%] space-y-12 py-10">
      {Object.entries(groupedProducts).map(([category, products]) => {
        // const category = item[0];
        // const products = item[1];

        return (
          <section key={category}>
            {/* Category Header */}
            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-3">
              <h2 className="text-2xl font-bold capitalize text-gray-800">
                {category}
              </h2>

              <button className="text-sm cursor-pointer font-semibold text-blue-600 transition hover:text-blue-800">
                View All →
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((n) => {
                const discount = n.previousPrice - n.currentPrice;
                const discountPercent =
                  n.previousPrice > 0
                    ? Math.round((discount / n.previousPrice) * 100)
                    : 0;

                return (
                  <div
                    key={n._id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                  >
                    {/* Image Area */}
                    <div className="relative flex items-center justify-center bg-gray-50 ">
                      <Image
                        src={n.image}
                        alt={n.name}
                        height={200}
                        width={200}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                      {/* Discount Badge */}
                      {discount > 0 && (
                        <span className="absolute left-3 top-3 rounded-md bg-red-500 px-2.5 py-1 text-xs font-bold text-white">
                          -{discountPercent}%
                        </span>
                      )}

                      {/* Save Badge */}
                      {discount > 0 && (
                        <span className="absolute right-3 top-3 rounded-md bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                          Save ৳{discount.toLocaleString("en-BD")}
                        </span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="line-clamp-2 min-h-12 font-semibold text-gray-800 transition group-hover:text-blue-600">
                        {n.name}
                      </h3>

                      <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                        {n.description}
                      </p>

                      {/* Price */}
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="text-xl font-bold text-blue-700">
                          ৳{n.currentPrice.toLocaleString("en-BD")}
                        </span>

                        {n.previousPrice > n.currentPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ৳{n.previousPrice.toLocaleString("en-BD")}
                          </span>
                        )}
                      </div>

                      {/* Stock / Availability (optional) */}
                      <p className="mt-2 text-xs font-medium text-green-600">
                        ● Available
                      </p>

                      {/* Add to Cart */}
                      <button className="mt-4 w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default AllProduct;
