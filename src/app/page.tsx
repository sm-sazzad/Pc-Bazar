import AllProduct from "@/components/AllProduct";
import Category from "@/components/Category";
import DropPrice from "@/components/DropPrice";
import Hero from "@/components/Hero";
import PriceUp from "@/components/PriceUp";

const page = () => {
  return (
    <div>
      <Hero />
      <Category />
      <DropPrice />
      <PriceUp />
      <AllProduct />
    </div>
  );
};

export default page;
