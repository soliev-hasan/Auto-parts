import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Button,
  Grid,
  Divider,
  ButtonGroup,
  Show,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import DiscountBox from "./DiscountBox";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { useToast } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

const HomeCard = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  function hideDeleteModal() {
    setShowDeleteModal(false);
  }

  async function addProductToCart() {
    // add item to redux cart
    const product = {
      id: props.id,
      title: props.title,
      discount: props.discount,
      discountAmount: props.discountAmount,
      imageUrl: props.imageUrl,
      numCilinders: props.numCilinders,
      capacity: props.capacity,
      power: props.power,
      oil: props.oil,
      price: props.price,
      quantity: 1,
    };

    dispatch(addToCart(product));

    try {
      // no error
      toast({
        title: "Product added",
        description: "View your cart to see all products",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: error.message,
        description: "Item could not be added to your cart.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log(error);
    }
  }

  // update product

  return (
    <>
      <Card maxW="sm" position={props.discount ? "relative" : "static"}>
        {props.discount && <DiscountBox amount={props.discountAmount} />}
        <CardBody>
          <Image
            src={props.imageUrl}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            w={{ base: 300, md: 400 }}
            h={{ base: 200, md: 250 }}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{props.title}</Heading>
            {props.category === "brakes" && (
              <>
                {" "}
                <Text>Brake size: {props.brakeSize}</Text>
                <Text>Brake Material: {props.brakeMaterial}</Text>
              </>
            )}

            {props.category === "engine" && (
              <>
                {" "}
                <Text>Number of cilinders: {props.numCilinders}</Text>
                <Text>Engine capacity: {props.capacity}</Text>
                <Text>Engine power: {props.power}</Text>
                <Text>Oil: {props.oil}</Text>
              </>
            )}

            {props.category === "cooling" && (
              <>
                {" "}
                <Text>Cooling power: {props.coolingPower}</Text>
              </>
            )}
            {props.category === "suspension" && (
              <>
                {" "}
                <Text>Suspension material: {props.suspensionMaterial}</Text>
                <Text>Suspension travel: {props.suspensionTravel}</Text>
              </>
            )}
            {!props.discount && (
              <Text color="#e03131" fontSize="2xl">
                ${props.price}
              </Text>
            )}
            {props.discount && (
              <Text
                color={props.discount ? "gray.500" : "#e03131"}
                fontSize="xl"
                textDecoration={props.discount ? "line-through" : "none"}
              >
                ${props.price}
              </Text>
            )}

            {props.discount && (
              <Text color="#e03131" fontSize="2xl">
                ${props.price - (props.price / 100) * props.discountAmount}
              </Text>
            )}
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            {props.updateMode || props.deleteMode || (
              <Button
                variant="solid"
                colorScheme="red"
                onClick={addProductToCart}
              >
                Add to cart
              </Button>
            )}
            {props.deleteMode && (
              <Button
                variant="solid"
                colorScheme="red"
                onClick={() => {
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </Button>
            )}
            {props.updateMode && (
              <Link
                as={ReachLink}
                to={`/updatePage/${props.id}`}
                _hover={{ textDecoration: "none" }}
              >
                <Button variant="solid" colorScheme="green">
                  Update
                </Button>
              </Link>
            )}
            {props.updateMode || props.deleteMode || (
              <Link as={ReachLink} to={`/product/${props.id}`}>
                <Button variant="ghost" colorScheme="gray">
                  View Details
                </Button>
              </Link>
            )}
          </ButtonGroup>
        </CardFooter>
      </Card>

      <DeleteModal
        isOpen={showDeleteModal}
        close={hideDeleteModal}
        productId={props.id}
        refreshProducts={props.refreshProducts}
      />
    </>
  );
};

export default HomeCard;
