import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/UserMutationHook";
import { createOrder } from "../../services/OrderService";
import { PayPalButton } from "react-paypal-button-v2";
import { removeAllOrder } from "../../redux/slides/oderSlice";
import { useNavigate } from "react-router-dom";

const PayPal = ({ priceMemo, totalPriceMemo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  const mutationAddOrder = useMutationHook((data) => {
    const { access_token, ...rests } = data;
    const res = createOrder(access_token, rests);
    return res;
  });

  const createOrderPaypal = (details, data) => {
    mutationAddOrder.mutate({
      access_token: user?.access_token,
      orderItems: order?.orderItemsSlected,
      fullName: user?.name,
      address: user?.address,
      phone: user?.phone,
      itemsPrice: priceMemo,
      totalPrice: totalPriceMemo,
      user: user?.id,
      isPaid: true,
      paiAt: details.update_time,
      paymentMethod: "paypal",
      email: user?.email,
    });
  };

  const { isSuccess, isError, data: dataAdd } = mutationAddOrder;

  useEffect(() => {
    if (isSuccess && dataAdd?.status === "OK") {
      const arrayOrder = [];
      order?.orderItemsSlected?.forEach((element) => {
        arrayOrder.push(element.product);
      });
      dispatch(removeAllOrder({ listChecked: arrayOrder }));
      alert("Đặt hàng thành công");
      navigate("/ordersuccess", {
        state: {
          totalPriceMemo: totalPriceMemo,
          order: order?.orderItemsSlected,
          methon: "Paypal",
        },
      });
    } else if (isError) {
      alert("Đặt hành thất bại");
    }
  }, [isSuccess, isError]);

  return (
    <PayPalButton
      options={{ currency: "CAD" }}
      amount={Math.round(totalPriceMemo / 30000)}
      // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
      onSuccess={createOrderPaypal}
    />
  );
};
export default PayPal;
