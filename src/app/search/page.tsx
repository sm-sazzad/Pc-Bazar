import { IProduct } from "@/components/AllProduct";
import SearchPage from "@/components/SearchBar";

const page = async () => {
  const res = await fetch(
    "https://better-auth-backend-kappa.vercel.app/api/products",
  );
  const resData: IProduct[] = await res.json();
  console.log(resData);
  return (
    <div>
      <SearchPage resData={resData} />
    </div>
  );
};

export default page;
