import Link from "next/link";

export type Root = Root2[];

export interface Root2 {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

const Navbar = async () => {
  const res = await fetch(
    "https://better-auth-backend-kappa.vercel.app/api/categories",
  );
  const resData: Root = await res.json();
  console.log(resData, "from nav");
  return (
    <nav className="flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4 shadow-sm">
      {/* Logo */}
      <div>
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-gray-900"
        >
          PC<span className="text-blue-600">Bazar</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="hidden items-center gap-8 md:flex">
        {resData.map((n) => (
          <Link
            key={n._id}
            href="/"
            className="font-medium text-gray-600 transition hover:text-blue-600"
          >
            {n.name}
          </Link>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <button className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100">
          Sign In
        </button>

        <button className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white shadow-sm transition hover:bg-blue-700">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
