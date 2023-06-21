import HeadingBox from "../components/HeadingBox";
import CardGrid from "../components/CardGrid";
import { useParams } from "react-router-dom";
import { dummyData } from "./HomePage";
import { useLoaderData } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Container,
  Box,
  Flex,
  Text,
  Button,
  Select,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link as ReachLink } from "react-router-dom";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const params = useParams();
  const category = params.category;
  let limit = 3;
  const [productsData, setProductsData] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const { products, totalItems } = useLoaderData();

  if (category === "all") {
    limit = 20;
  }

  const totalPages = Math.floor(totalItems / limit);

  useEffect(() => {
    setProductsData([...products]);
  }, [products]);

  useEffect(() => {
    async function getProducts() {
      try {
        const result = await fetch(
          `https://autparts.onrender.com/products/allProducts/${category}?page=${page}&filter=${filter}`
        );

        const { products } = await result.json();

        console.log(products);
        setProductsData([...products]);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, [page, filter]);

  function nextProducts() {
    console.log("next");
    setPage((prevState) => (prevState = prevState + 1));
  }

  function prevProducts() {
    console.log("prev");
    setPage((prevState) => (prevState = prevState - 1));
  }

  function filterHandler(e) {
    const newFilter = e.target.value;
    setFilter(newFilter);
  }

  function dateFilterHandler(e) {
    const newDateFilter = e.target.value;
    const currentProducts = [...products];

    if (newDateFilter === "oldest") {
      currentProducts.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    if (newDateFilter === "newest") {
      currentProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setProductsData([...currentProducts]);
  }

  return (
    <>
      <HeadingBox title={params.category.toUpperCase()} mb={10} />

      <Box mr={"auto"} ml={"auto"} maxWidth={"1100px"} mt={5} mb={10} pl={2}>
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
          mb={3}
        >
          <BreadcrumbItem>
            <BreadcrumbLink as={ReachLink} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink as={ReachLink} to="/">
              Category
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              as={ReachLink}
              to={`/allProducts/${params.category}`}
            >
              {params.category[0].toUpperCase() + params.category.slice(1)}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Flex
        mr={"auto"}
        ml={"auto"}
        maxWidth={"1100px"}
        mb={5}
        mt={5}
        alignItems={"center"}
        justifyContent={"flex-start"}
        gap={"2rem"}
        pl={2}
      >
        <Text fontWeight={600}>Filter by:</Text>
        <Select
          placeholder="By price"
          w={"fit-content"}
          onChange={filterHandler}
        >
          <option value="highest">Highest</option>
          <option value="lowest">Lowest</option>
        </Select>

        <Select
          placeholder="By date"
          w={"fit-content"}
          onChange={dateFilterHandler}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </Select>
      </Flex>
      {/*  */}
      <CardGrid products={productsData} mb={5} />

      <Flex alignItems={"center"} justifyContent={"center"} gap={"2rem"}>
        {page > 1 && (
          <Button
            variant="solid"
            colorScheme="red"
            fontSize={"1.2rem"}
            color={"#fff"}
            onClick={prevProducts}
          >
            Previous
          </Button>
        )}
        {page < totalPages && (
          <Button
            variant="solid"
            colorScheme="red"
            fontSize={"1.2rem"}
            color={"#fff"}
            onClick={nextProducts}
          >
            Next
          </Button>
        )}
      </Flex>
    </>
  );
};

export default CategoryPage;

export async function loader({ params }) {
  const category = params.category;
  console.log(category);
  try {
    const result = await fetch(
      "https://autparts.onrender.com/products/allProducts/" + category
    );

    const { products, totalItems } = await result.json();

    return { products, totalItems };
  } catch (error) {
    console.log(error);
  }
}
