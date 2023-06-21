import { Box, Center } from "@chakra-ui/react";
import Multistep from "../components/MultiStepForm";
const RegisterPage = () => {
  return (
    <Center bgColor={"gray.800"} w={"100%"} h={"100vh"}>
      <Multistep />
    </Center>
  );
};

export default RegisterPage;
