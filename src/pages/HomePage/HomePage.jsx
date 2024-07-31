import React, { useEffect, useRef, useState } from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "../../services/ProductService";
import BlogPost from "../../components/BlogPost/BlogPost";
import Welfare from "../../components/Welfare/Welfare";
import BestSeller from "../../components/BestSeller/BestSeller";
import banner1 from "../../ass/image/banner1.avif";
import banner2 from "../../ass/image/banner2.avif";

const HomePage = () => {
  const [limit, setLimit] = useState(18);
  const [products, setProducts] = useState([]);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const res = await getAllProduct("", limit);

    return res;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["products", limit],
    queryFn: fetchProductAll,
    placeholderData: true,
    retry: true,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setProducts(data);
    }
  }, [isLoading, data]);

  return (
    <div>
      <div className="bg-[#f5f5fa] dark:bg-[#18191a] pb-8 ">
        <SliderComponent />

        <div className="flex md:gap-5 gap-1 w-full max-w-7xl mx-auto px-2 items-start ">
          <NavbarComponent />
          <div className="  w-[calc(100%-230px-4px)] flex flex-col justify-center ">
            <BestSeller />
            <div className=" flex items-center gap-7 w-full mt-8">
              <img
                src={banner2}
                className="w-full object-contain"
                alt="banner1"
              />
              <img
                src={banner1}
                className="w-full object-contain"
                alt="banner2"
              />
            </div>
          </div>
        </div>
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center px-2">
          <div className=" mt-8 grid sm:grid-cols-4 gap-4 flex-1 xl:grid-cols-6 grid-cols-4 lg:grid-cols-5 grid-cols-2">
            {products?.data?.map((product) => {
              return (
                <CardComponent
                  key={product._id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  rating={product.rating}
                  discount={product.discount}
                  selled={product.selled}
                  countInStrock={product.countInStrock}
                  idProduct={product._id}
                />
              );
            })}
          </div>

          <button
            disabled={
              products?.total === products?.data?.length ||
              products?.totalPages === 1
            }
            onClick={() => setLimit(limit + 6)}
            className="text-[#0a68ff] disabled:cursor-not-allowed disabled:bg-slate-400 hover:bg-[rgba(0,96,255,0.12)] transition-all border-[#0a68ff] border-[1px] rounded-md py-2 px-3 text-base cursor-pointer mt-3 mx-auto w-60"
          >
            Xem Thêm
          </button>
        </div>
        <BlogPost />
        <Welfare />
      </div>
    </div>
  );
};

export default HomePage;
