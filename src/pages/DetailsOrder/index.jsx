import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { getDetailsOrder } from "../../services/OrderService";
import { useSelector } from "react-redux";
import { convertPrice } from "../../utils";

const DetailsOrder = () => {
  const user = useSelector((state) => state.user);

  const { id } = useParams();

  const fetchDetailsOrder = async () => {
    const res = await getDetailsOrder(id, user?.access_token);
    return res.data;
  };

  const queryUserOrder = useQuery({
    queryKey: ["DetailsOrder"],
    queryFn: fetchDetailsOrder,
    enabled: Boolean(user?.id && user?.access_token),
  });

  const { data } = queryUserOrder;

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [data]);

  return (
    <div>
      <div className=" bg-[#efefef] py-4 min-h-screen dark:bg-[#18191a]">
        <div className=" max-w-screen-xl px-5 mx-auto">
          <p className="text-xl font-medium text-black dark:text-[#e4e6eb]">
            Chi tiết đơn hàng
          </p>
          <div className=" grid grid-cols-3  gap-20 mt-3 dark:text-[#e4e6eb]">
            <div>
              <p>ĐỊA CHỈ NGƯỜI NHẬN</p>
              <div className="bg-white p-2 rounded-md text-base mt-2 min-h-[96px] dark:bg-[#242526]">
                <div className="flex flex-col gap-1">
                  <p className=" font-bold">
                    Tên: {data?.shippingAddress.fullName}
                  </p>
                  <p>Địa chỉ: {data?.shippingAddress.address}</p>
                  <p>SĐT: {data?.shippingAddress.phone}</p>
                </div>
              </div>
            </div>
            <div>
              <p>HÌNH THỨC GIAO HÀNG</p>
              <div className="bg-white p-2 rounded-md text-base mt-2 min-h-[96px] dark:bg-[#242526]">
                <div className="flex flex-col gap-1">
                  <p>Giao hàng tiết kiệm</p>
                  <p>Phí giao hành:12000đ</p>
                </div>
              </div>
            </div>
            <div>
              <p>HÌNH THỨC THANH TOÁN</p>
              <div className="bg-white p-2 rounded-md text- text-base mt-2 min-h-[96px] dark:bg-[#242526]">
                <div className="flex flex-col gap-1">
                  <p>
                    {data?.paymentMethod === "later_money"
                      ? "Thanh toán khi nhận hàng"
                      : "Paypal"}
                  </p>
                  <p
                    className={`${
                      data?.isPaid ? "text-[#0a68ff]" : "text-red-500"
                    } font-semibold`}
                  >
                    {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                  </p>

                  <p>
                    <samp>trạng thái: </samp>
                    {data?.trait === "successfully" && "Giao hàng thành công"}
                    {data?.trait === "delivering" && "Đang giao hàng"}
                    {data?.trait !== "successfully" &&
                      data?.trait !== "delivering" &&
                      "Đang xử lý"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-3 grid grid-cols-[auto,100px,100px,100px,100px,100px] items-center">
            <p>Sản phẩm</p>
            <p>Giá</p>
            <p>Số lượng</p>
            <p>Giảm giá</p>
            <p>Tổng giảm</p>
            <p className=" font-bold">Tổng cộng</p>
          </div>
          {data?.orderItems?.map((order) => {
            return (
              <div className=" mt-3 grid grid-cols-[auto,100px,100px,100px,100px,100px] items-center">
                <div className="flex gap-3 items-center">
                  <img src={order.image} className="w-20 h-20" alt="" />
                  <p>{order.name}</p>
                </div>
                <p className=" font-semibold">
                  {convertPrice(order.price)}
                  <sup>đ</sup>
                </p>
                <p className=" font-semibold ml-4 ">{order.amount}</p>
                <p className=" font-semibold">{order.discount}%</p>
                <p className=" font-semibold">
                  {" "}
                  {convertPrice(
                    (order?.price * order?.amount * order?.discount) / 100
                  )}
                </p>
                <p className=" text-red-500 font-semibold">
                  {convertPrice(
                    order.price * order.amount -
                      (order.discount / 100) * order.price * order.amount
                  )}
                  <sup>đ</sup>
                </p>
              </div>
            );
          })}
          <div className="mt-3 text-red-600 font-semibold text-right ">
            Thành tiền: {convertPrice(data?.totalPrice)}
            <sup>đ</sup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsOrder;
