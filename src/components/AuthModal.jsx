import {
  Flex,
  Text,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Link,
  Divider,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState, clearAuthState } from "../slices/authSlice";

const AuthModal = (props) => {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const toast = useToast();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  async function googleLoginHandler() {
    try {
      const result = await fetch(
        "https://autparts.onrender.com/auth/login/google"
      );

      const data = await result.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function emailValidationHandler() {
    const email = emailRef.current.value;

    if (!email.includes("@")) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }
  function passwordValidationHandler() {
    const password = passwordRef.current.value;

    if (password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }

  async function submitHandler() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (emailError || passwordError) {
      return;
    }

    console.log(email, password);

    try {
      const result = await fetch("https://autparts.onrender.com/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await result.json();

      if (response.error) {
        throw new Error(response.message);
      }

      // response should now be a token
      console.log(response);

      // store token to global state
      dispatch(setAuthState(response));

      // store token and expiry date to local storage
      let tokenExpiryDate = new Date();
      tokenExpiryDate.setHours(tokenExpiryDate.getHours() + 3);
      tokenExpiryDate = tokenExpiryDate.toISOString();
      localStorage.setItem("token", response.token);
      localStorage.setItem("tokenExp", tokenExpiryDate);
      localStorage.setItem("userId", response.userId);

      // in 3h call a function which logs user out
      setTimeout(() => {
        dispatch(clearAuthState());
        navigate("/");
      }, 3 * 60 * 60 * 1000);

      toast({
        title: "Logged in",
        description: "Successfully logged in",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      props.onClose();
    } catch (error) {
      toast({
        title: error.message,
        description:
          "Make sure you have entered valid credentials and have a internet connection.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  }

  return (
    <Modal
      onClose={() => {
        props.onClose();
      }}
      size={"md"}
      isOpen={props.open}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Login</ModalHeader>
        <Text
          textAlign={"center"}
          fontSize={"sm"}
          fontWeight={500}
          mr={5}
          ml={5}
          mb={2}
          color={"#555"}
        >
          Log in to see your favorite products, complete your order, or edit
          your account
        </Text>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            direction={"column"}
            // alignItems={"center"}
            justifyContent={"center"}
            gap={4}
          >
            <FormControl isInvalid={emailError}>
              <Text mb="8px">Email:</Text>
              <Input
                placeholder="email@example.com"
                size="md"
                focusBorderColor="blue"
                onChange={emailValidationHandler}
                ref={emailRef}
              />

              <FormErrorMessage>Please enter a valid email!</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={passwordError}>
              <Text mb="8px">Password:</Text>
              <InputGroup>
                <InputRightElement
                  cursor={"pointer"}
                  onClick={() => {
                    setShowPassword((prevState) => !prevState);
                  }}
                >
                  {!showPassword && <ViewIcon color="gray.500" h={5} w={5} />}
                  {showPassword && <ViewOffIcon color="gray.500" h={5} w={5} />}
                </InputRightElement>
                <Input
                  placeholder="Password123@"
                  size="md"
                  focusBorderColor="blue"
                  type={showPassword ? "text" : "password"}
                  onChange={passwordValidationHandler}
                  ref={passwordRef}
                />
              </InputGroup>
              <FormErrorMessage>
                Please enter a valid password!
              </FormErrorMessage>
            </FormControl>

            <Link as={ReachLink} to={"/"} textDecor={"underline"}>
              Forgot your password?
            </Link>
            <Button w={"100%"} colorScheme="red" onClick={submitHandler}>
              Login
            </Button>

            <Divider />
            <Flex
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={2}
            >
              <Text fontSize={"1.6rem"} fontWeight={600}>
                Don't have an account?
              </Text>
              <Link
                as={ReachLink}
                to="/register"
                textDecor={"none"}
                width={"100%"}
              >
                <Button
                  colorScheme="gray"
                  variant="outline"
                  width={"100%"}
                  borderRadius={"1000"}
                >
                  Register
                </Button>
              </Link>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
