import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { createOrder } from "../lib/orderHandler";
import css from "../styles/OrderModal.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useStore } from "../Store/store";
import { useRouter } from "next/router";
const OrderModel = ({ opened, setOpened, PaymentMethod }) => {
  const [FormData, setFormData] = useState({});
  const HandleInput = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };
  const resetCart = useStore((state) => state.resetCart);
  const total = typeof window !== "undefined" && localStorage.getItem("total");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await createOrder({ ...FormData, total, PaymentMethod });
    toast.success("Order Placed");
    resetCart();
    {
      typeof window !== "undefined" && localStorage.getItem("order", id);
    }
    router.push(`/order/${id}`);
  };
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      {/* Modal content */}
      <form action="" className={css.container}>
        <input
          onChange={HandleInput}
          type="text"
          name="name"
          required
          placeholder="Name"
        />
        <input
          onChange={HandleInput}
          type="text"
          name="phone"
          required
          placeholder="Phone Number"
        />
        <textarea
          onChange={HandleInput}
          name="Address"
          rows={3}
          placeholder="Adress"
        ></textarea>
        <span>
          You wil Pay <span>$ {total}</span> on Delivery
        </span>
        <button type="submit" className="btn" onClick={handleSubmit}>
          Place Order
        </button>
      </form>
      <Toaster />
    </Modal>
  );
};

export default OrderModel;
