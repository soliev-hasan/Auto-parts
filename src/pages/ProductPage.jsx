import { Box, Grid, Heading, Text, Image, Container } from "@chakra-ui/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Icon,
  Flex,
  Badge,
  Button,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { BsStar } from "react-icons/bs";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import sideBarImg from "../public/mechanic.jpg";
import { useLoaderData } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
const ProductPage = () => {
  const product = useLoaderData();

  return (
    <Grid
      marginTop={0}
      marginBottom={100}
      mr={"auto"}
      ml={"auto"}
      maxWidth={"1100px"}
      gridTemplateColumns={{ base: "1fr", sm: "70fr 30fr" }}
      pr={2}
      pl={2}
    >
      <Box>
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
          mb={5}
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={ReachLink} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              as={ReachLink}
              to={`/allProducts/${product.category}`}
            >
              {product.category}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">{product.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        {/*  */}
        <Heading>{product.title.toUpperCase()}</Heading>
        <Flex
          alignItems={"center"}
          justifyContent={"flex-start"}
          gap={2}
          mb={2}
        >
          <Icon as={BsStar} />
          <Icon as={BsStar} />
          <Icon as={BsStar} />
          <Icon as={BsStar} />
          <Icon as={BsStar} />
        </Flex>
        {!product.discount && <Text mb={5}>Price: {product.price} $</Text>}
        {product.discount && (
          <Text mb={2} textDecoration={"line-through"}>
            Price: {product.price} $
          </Text>
        )}
        {product.discount && (
          <Text mb={5} color={"#e03131"}>
            NEW PRICE: $
            {product.price - (product.price / 100) * product.discountAmount}
          </Text>
        )}

        <Box mb={20}>
          <Image src={product.imageUrl} w={"80%"} borderRadius={"12px"} />
        </Box>

        <Heading mb={4}>Details</Heading>
        <Flex
          direction={"column"}
          alignItems={"flex-start"}
          justifyContent={"center"}
          gap={5}
          fontSize={"1.4rem"}
          mb={10}
        >
          {product.category === "engine" && (
            <>
              <Text>
                Engine Capacity:{" "}
                <Badge colorScheme="gray" fontSize={"1.2rem"} color={"#000"}>
                  {product.capacity} L
                </Badge>
              </Text>
              <Text>
                Engine Oil:{" "}
                <Badge colorScheme="gray" fontSize={"1.2rem"} color={"#000"}>
                  {product.oil}
                </Badge>
              </Text>
              <Text>
                Engine Power:{" "}
                <Badge colorScheme="gray" fontSize={"1.2rem"} color={"#000"}>
                  {product.power} HP
                </Badge>
              </Text>
              <Text>
                Engine Milage:{" "}
                <Badge colorScheme="gray" fontSize={"1.2rem"} color={"#000"}>
                  {product.miles} KM
                </Badge>
              </Text>
              <Text>
                Number of Cilinders:{" "}
                <Badge colorScheme="gray" fontSize={"1.2rem"} color={"#000"}>
                  {product.numCilinders}
                </Badge>
              </Text>
            </>
          )}

          {product.category === "brakes" && (
            <>
              <Text>
                Brake size:{" "}
                <Badge colorScheme="gray" fontSize={"1.2rem"} color={"#000"}>
                  {product.brakeSize} mm
                </Badge>
              </Text>
              <Text>
                Brake Material:{" "}
                <Badge colorScheme="gray" fontSize={"1.2rem"} color={"#000"}>
                  {product.brakeMaterial}
                </Badge>
              </Text>
            </>
          )}

          {product.category === "cooling" && (
            <>
              <Text>
                Cooling power:{" "}
                <Badge colorScheme="gray" fontSize={"1.2rem"} color={"#000"}>
                  {product.coolingPower}
                </Badge>
              </Text>
            </>
          )}

          {product.category === "suspension" && (
            <>
              <Text>
                Suspension travel:{" "}
                <Badge colorScheme="gray" fontSize={"1.2rem"} color={"#000"}>
                  {product.suspensionTravel}
                </Badge>
              </Text>
              <Text>
                Suspension material:{" "}
                <Badge colorScheme="gray" fontSize={"1.2rem"} color={"#000"}>
                  {product.suspensionMaterial}
                </Badge>
              </Text>
            </>
          )}
        </Flex>

        <Heading mb={5}>Product Description</Heading>
        <Text textAlign={"left"} fontSize={"1.2rem"} maxWidth={"lg"} mb={10}>
          {product.description}
        </Text>

        <Heading mb={5}>Users also bought</Heading>

        <Flex padding={2} direction={{ base: "column", md: "row" }}>
          <Flex
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"1.2rem"}
            border={"1px"}
            borderColor={"gray.500"}
            borderRadius={"9px"}
          >
            <Image
              src="https://images.thdstatic.com/productImages/6b63edcc-dab5-451e-913b-8184a1d3da31/svn/wd-40-lubricants-110057-64_1000.jpg"
              w={200}
              h={200}
            />
            <Text fontSize={"1.4rem"}>WD 40</Text>
            <Text>For all your lubrication needs.</Text>
          </Flex>

          <Flex
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"1.2rem"}
          >
            <Icon as={AiFillPlusCircle} w={100} h={100} color={"#e03131"} />
          </Flex>

          <Flex
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"1.2rem"}
            border={"1px"}
            borderColor={"gray.500"}
            borderRadius={"9px"}
          >
            <Image
              src="https://cdn11.bigcommerce.com/s-1vohxdh8gj/images/stencil/1280x1280/products/2433/7739/PBX-L_Wrench_10mm__57096.1657571831.jpg?c=2?imbypass=on"
              w={200}
              h={200}
            />
            <Text fontSize={"1.4rem"}>10mm Socket</Text>
            <Text>Use it or lose it.</Text>
          </Flex>
        </Flex>
      </Box>

      <Box>
        <Heading size={"lg"} textAlign={"center"} color={"#e03131"} mb={10}>
          AUTOparts support
        </Heading>

        <Accordion defaultIndex={[0]} allowMultiple mb={10}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Refund Policy
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Approved Sellers
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Heading mb={5}>Or you can contact us at:</Heading>
        <Card mb={5}>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Phone number
                </Heading>
                <Text pt="2" fontSize="sm">
                  +38269500144
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Email
                </Heading>
                <Text pt="2" fontSize="sm">
                  dinokrcicprof@gmail.com
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>

        <Box
          backgroundImage={`url(${sideBarImg})`}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          height={"50%"}
          backgroundSize="cover"
          borderRadius={"12px"}
          position={"relative"}
          // zIndex={-1}
        >
          <Flex
            position={"absolute"}
            zIndex={10}
            top={50}
            alignItems={"center"}
            justifyContent={"center"}
            direction={"column"}
          >
            <Text
              color={"#fff"}
              fontSize={"1.4rem"}
              textAlign={"center"}
              textShadow={"4px 4px 2px rgba(0,0,0,0.6)"}
            >
              You can rely on our expirianced service personel
            </Text>
            <Button
              padding={"1rem 2rem"}
              cursor={"pointer"}
              colorScheme="gray"
              variant="solid"
            >
              Learn More
            </Button>
          </Flex>
        </Box>
      </Box>
    </Grid>
  );
};

export default ProductPage;

export async function loader({ params }) {
  try {
    // get individual product form db
    const productId = params.productId;

    const result = await fetch(
      "https://autparts.onrender.com/products/product/" + productId
    );

    const { product } = await result.json();

    return product;
  } catch (error) {
    console.log(error);
  }
}
