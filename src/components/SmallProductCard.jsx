import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  StackDivider,
  Button,
  Heading,
  Image,
  Text,
  Link,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
const SmallProductCard = (props) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "25%" }}
        src={props.imageUrl}
        alt="Caffe Latte"
      />

      <Stack>
        <CardBody>
          <Heading size="md" mb={2}>
            {props.title}
          </Heading>

          <Text>Price: {props.price} $</Text>
          <Text
            textOverflow={"clip"}
            maxWidth={"95%"}
            overflow={"hidden"}
            display={`-webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical`}
          >
            Description: {props.description}
          </Text>
          <Text>Category: {props.description}</Text>
        </CardBody>

        <CardFooter
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={2}
        >
          <Button variant="solid" colorScheme="red">
            Add to cart
          </Button>
          <Link
            as={ReachLink}
            to={`/product/${props.id}`}
            onClick={props.close}
          >
            <Button variant="ghost" colorScheme="gray">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default SmallProductCard;
