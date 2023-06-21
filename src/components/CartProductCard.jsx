import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../slices/cartSlice";

const CartProductCard = (props) => {
  const dispatch = useDispatch();
  function removeProductHandler() {
    const productId = props.id;

    dispatch(removeFromCart(productId));
  }

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      w={"100%"}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "150px" }}
        src={props.imageUrl}
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md">{props.title}</Heading>

          <Text py="1">Milage:{props.milage}km</Text>
          <Text py="1">Price:{props.price}$</Text>
        </CardBody>

        <CardFooter
          pt={0}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          pl={1}
        >
          <Button
            variant="solid"
            colorScheme="red"
            onClick={removeProductHandler}
          >
            Remove
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default CartProductCard;
