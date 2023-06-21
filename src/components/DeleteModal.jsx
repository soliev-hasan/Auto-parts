import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";

const DeleteModal = (props) => {
  const token = useSelector((state) => state.auth.token);
  const toast = useToast();
  async function deleteHandler() {
    try {
      console.log(props.productId);
      const result = await fetch(
        "https://autparts.onrender.com/products/delete/" + props.productId,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      props.close();

      setTimeout(() => {
        props.refreshProducts();
      }, 2000);

      toast({
        title: "Product deleted.",
        description: "Deletion successfull",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error occured",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }
  return (
    <Modal isOpen={props.isOpen} onClose={() => props.close()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Deleting product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this product?</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => props.close()}>
            Close
          </Button>
          <Button variant="solid" colorScheme="red" onClick={deleteHandler}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
