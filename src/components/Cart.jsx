import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Flex,
  List,
  UnorderedList,
  ListItem,
  Text,
} from "@chakra-ui/react";
import CartProductCard from "./CartProductCard";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../slices/cartSlice";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart.cart);
  const token = useSelector((state) => state.auth.token);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  function clearCartHandler() {
    dispatch(clearCart());
  }

  async function buyHandler() {
    try {
      const result = await fetch(
        "https://autparts.onrender.com/payments/create-checkout-session",
        {
          method: "POST",
          body: JSON.stringify({ cart: cart }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const { url } = await result.json();
      clearCartHandler();

      window.location.href = url;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Drawer
      isOpen={props.open}
      placement="right"
      onClose={() => {
        props.onClose();
      }}
      size={"md"}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Cart</DrawerHeader>

        <DrawerBody height={"100%"}>
          <List
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            overflowY={"scroll"}
            gap={"2rem"}
            height={"80%"}
            w={"100%"}
          >
            {cart.map((product) => (
              <ListItem w={"100%"} key={product.id}>
                <CartProductCard
                  title={product.title}
                  milage={product.milage}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  id={product.id}
                />
              </ListItem>
            ))}
          </List>
        </DrawerBody>

        <DrawerFooter>
          <Text mr={2} fontSize={"1.2rem"}>
            Total price: {totalAmount}$
          </Text>
          <Button variant="outline" mr={3} onClick={clearCartHandler}>
            Clear all
          </Button>
          <Button colorScheme="red" onClick={buyHandler}>
            Order
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
