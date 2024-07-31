import React, { useEffect } from "react";
import ProductComponent from "../../components/ProductComponent/ProductComponent";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-[#f5f5fa] dark:bg-[#18191a]">
      <div className=" max-w-7xl px-2 mx-auto py-3">
        <ProductComponent idProduct={id} />
      </div>
    </div>
  );
};

export default ProductPage;
