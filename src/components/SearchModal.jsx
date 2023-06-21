import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Text,
  Box,
  Flex,
  ListItem,
  List,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import SmallProductCard from "./SmallProductCard";
const SearchModal = (props) => {
  const [products, setProducts] = useState([]);
  const searchRef = useRef();
  async function getProducts() {
    const searchQuery = searchRef.current.value;

    try {
      const result = await fetch(
        "https://autparts.onrender.com/products/search/" + searchQuery
      );

      const { products } = await result.json();

      setProducts([...products]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setProducts([]);
  }, [props.isOpen]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.close} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search our catalog</ModalHeader>
        <ModalCloseButton />

        <ModalBody h={"100%"}>
          <Input
            placeholder="search products"
            variant={"outline"}
            size={"md"}
            width={"100%"}
            borderColor="#e03131"
            focusBorderColor="#e65a5a"
            borderWidth={2}
            mb={5}
            onChange={getProducts}
            ref={searchRef}
          />

          <List
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            overflowY={"scroll"}
            gap={"2rem"}
            height={{ base: "40vh", md: "60vh" }}
            w={"100%"}
            pb={3}
          >
            {products.length === 0 && (
              <ListItem w={"100%"}>
                <Text color={"gray.500"}>Search all of our products</Text>
              </ListItem>
            )}
            {products.map((product) => (
              <ListItem>
                <SmallProductCard
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  key={product._id}
                  id={product._id}
                  imageUrl={product.imageUrl}
                  category={product.category}
                  close={props.close}
                />
              </ListItem>
            ))}
          </List>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
