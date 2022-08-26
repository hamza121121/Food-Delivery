import Layout from "../Components/Layout";
import { useStore } from "../Store/store";
import Image from "next/image";
import css from "../styles/Cart.module.css";
import { urlFor } from "../lib/client";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import OrderModel from "../Components/OrderModel";
import { useRouter } from "next/dist/client/router";
const cart = () => {
  const CartData = useStore((state) => state.cart);
  const removePizza = useStore((state) => state.removePizza);
  const [PaymentMethod, setPaymentMethod] = useState(null);
  const [Order ,setOrder] = useState(
    typeof window !== "undefined" && localStorage.getItem('order'))
  const handleRemove = (i) => {
    removePizza(i);
    toast.error("Item Remove");
  };
  const router = useRouter();
  const total = () =>
    CartData.pizzas.reduce((a, b) => a + b.quentity * b.price, 0);
  const handleonDelivery = () => {
    setPaymentMethod(0);
    typeof window !== "undefined" && localStorage.setItem("total", total());
  };
  return (
    <div>
      <Layout>
        <div className={css.container}>
          <div className={css.detail}>
            <table className={css.table}>
              <thead>
                <th>Pizza</th>
                <th>Name</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quentity</th>
                <th>Total</th>
                <th></th>
              </thead>
              <tbody className={css.tbody}>
                {CartData.pizzas.length > 0 &&
                  CartData.pizzas.map((pizza, i) => {
                    const src = urlFor(pizza.image).url();
                    return (
                      <tr key={i}>
                        <td className={css.imageTd}>
                          <Image
                            src={src}
                            loader={() => src}
                            alt=""
                            objectFit="cover"
                            height={85}
                            width={85}
                          />
                        </td>
                        <td>{pizza.name}</td>
                        <td>
                          {pizza.size === 0
                            ? "Small"
                            : pizza.size === 1
                            ? "Medium"
                            : "Large"}
                        </td>
                        <td>{pizza.price}</td>
                        <td>{pizza.quentity}</td>
                        <td>{pizza.price * pizza.quentity}</td>
                        <td
                          style={{
                            color: "var(--themeRed)",
                            cursor: "pointer",
                          }}
                          onClick={() => handleRemove(i)}
                        >
                          x
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className={css.cart}>
            <span>Cart</span>
            <div className={css.CartDetails}>
              <div>
                <span>Items</span>
                <span>{CartData.pizzas.length}</span>
              </div>
              <div>
                <span>Total</span>
                <span>$ {total()}</span>
              </div>
            </div>
            {!Order && CartData.pizzas.length >0 ?(
              <div className={css.button}>
              <button className="btn" onClick={handleonDelivery}>
                Pay on Delivery
              </button>
            </div>
            ):null}
            
          </div>
        </div>
        <Toaster />
        {/* {Model} */}
        <OrderModel
          opened={PaymentMethod === 0}
          setOpened={setPaymentMethod}
          PaymentMethod={PaymentMethod}
        />
      </Layout>
    </div>
  );
};

export default cart;
