import { Heading, Grid, Icon } from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Box,
  Text,
  StackDivider,
  Flex,
} from "@chakra-ui/react";
import { MdLibraryAdd, MdDelete, MdOutlineUpdate } from "react-icons/md";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid";

const AdminPage = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userId = useSelector((state) => state.auth.userId);
  const [deleteMode, setDeleteMode] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  async function getUserProducts() {
    try {
      const result = await fetch(
        "https://autparts.onrender.com/products/user/" + userId
      );

      const { products } = await result.json();
      console.log(products);
      setProducts([...products]);
    } catch (error) {
      console.log(error);
    }
  }

  function removeHandler() {
    setDeleteMode(true);
    setUpdateMode(false);
    getUserProducts();
  }
  function updateHandler() {
    setDeleteMode(false);
    setUpdateMode(true);
    getUserProducts();
  }

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);

  if (!isAuth) {
    return (
      <Heading textAlign={"center"} color={"#e03131"}>
        Not Authorized!
      </Heading>
    );
  }

  return (
    <>
      <Grid
        marginTop={0}
        marginBottom={20}
        mr={"auto"}
        ml={"auto"}
        maxWidth={"1100px"}
        gridTemplateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
        columnGap={5}
      >
        <Link
          as={ReachLink}
          to="/addProduct"
          _hover={{ textDecoration: "none" }}
        >
          <Card
            _hover={{
              cursor: "pointer",
              bgColor: "gray.200",
              transition: "all 0.2s",
            }}
            pb={10}
          >
            <CardHeader>
              <Heading size="md" textAlign={"center"}>
                Add product
              </Heading>
            </CardHeader>
            <CardBody>
              <Flex alignItems="center" justifyContent="center">
                <Icon as={MdLibraryAdd} color="#e03131" h={20} w={20} />
              </Flex>
            </CardBody>
          </Card>
        </Link>

        <Box onClick={removeHandler}>
          <Card
            _hover={{
              cursor: "pointer",
              bgColor: "gray.200",
              transition: "all 0.2s",
            }}
            pb={10}
          >
            <CardHeader>
              <Heading size="md" textAlign={"center"}>
                Remove product
              </Heading>
            </CardHeader>
            <CardBody>
              <Flex alignItems="center" justifyContent="center">
                <Icon as={MdDelete} color="#e03131" h={20} w={20} />
              </Flex>
            </CardBody>
          </Card>
        </Box>

        <Box onClick={updateHandler}>
          <Card
            _hover={{
              cursor: "pointer",
              bgColor: "gray.200",
              transition: "all 0.2s",
            }}
            pb={10}
          >
            <CardHeader>
              <Heading size="md" textAlign={"center"}>
                Update product
              </Heading>
            </CardHeader>
            <CardBody>
              <Flex alignItems="center" justifyContent="center">
                <Icon as={MdOutlineUpdate} color="#e03131" h={20} w={20} />
              </Flex>
            </CardBody>
          </Card>
        </Box>
      </Grid>

      {products.length === 0 && (
        <Heading textAlign={"center"} mb={500}>
          No products found
        </Heading>
      )}

      {products.length > 0 && (
        <CardGrid
          products={products}
          deleteMode={deleteMode}
          updateMode={updateMode}
          refreshProducts={getUserProducts}
          mb={300}
        />
      )}
    </>
  );
};

export default AdminPage;
