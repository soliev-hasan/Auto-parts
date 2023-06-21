import React, { useEffect, useRef, useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Form1 = (props) => {
  const [formError, setFormError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    passwordsEqual: false,
  });
  const [show, setShow] = React.useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const handleClick = () => setShow(!show);

  function validateFirstName() {
    const currentValue = firstNameRef.current.value;
    if (currentValue.length < 3) {
      setFormError((prevState) => {
        return {
          ...prevState,
          firstName: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          firstName: false,
        };
      });
    }
  }
  function validateLastName() {
    const currentValue = lastNameRef.current.value;
    if (currentValue.length < 3) {
      setFormError((prevState) => {
        return {
          ...prevState,
          lastName: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          lastName: false,
        };
      });
    }
  }
  function validateEmailName() {
    const currentValue = emailRef.current.value;
    if (!currentValue.includes("@")) {
      setFormError((prevState) => {
        return {
          ...prevState,
          email: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          email: false,
        };
      });
    }
  }
  function validatePassword() {
    const currentValue = passwordRef.current.value;
    if (currentValue.length > 8) {
      setFormError((prevState) => {
        return {
          ...prevState,
          password: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          password: false,
        };
      });
    }
  }
  function validatePasswordsEqual() {
    const currentValue = passwordRef.current.value;
    const currentValue2 = password2Ref.current.value;
    if (currentValue !== currentValue2) {
      setFormError((prevState) => {
        return {
          ...prevState,
          passwordsEqual: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          passwordsEqual: false,
        };
      });
    }
  }

  function onSubmit() {
    if (
      !formError.firstName &&
      !formError.lastName &&
      !formError.email &&
      !formError.password &&
      !formError.passwordsEqual
    ) {
      props.getData({
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password2: password2Ref.current.value,
      });
    }
  }

  return (
    <>
      <Heading
        w="100%"
        textAlign={"center"}
        fontWeight="normal"
        mb="2%"
        color={"#fff"}
      >
        User Registration
      </Heading>
      <Flex color={"#fff"}>
        <FormControl mr="5%" isInvalid={formError.firstName} isRequired>
          <FormLabel htmlFor="first-name" fontWeight={"normal"} color={"#fff"}>
            First name
          </FormLabel>
          <Input
            id="first-name"
            placeholder="First name"
            ref={firstNameRef}
            onChange={validateFirstName}
            onBlur={onSubmit}
          />
          <FormErrorMessage>Minimum length 3</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formError.lastName} isRequired>
          <FormLabel htmlFor="last-name" fontWeight={"normal"} color={"#fff"}>
            Last name
          </FormLabel>
          <Input
            id="last-name"
            placeholder="Last name"
            ref={lastNameRef}
            onChange={validateLastName}
            onBlur={onSubmit}
          />
          <FormErrorMessage>Minimum length 3</FormErrorMessage>
        </FormControl>
      </Flex>

      <FormControl mt="2%" isInvalid={formError.email} isRequired>
        <FormLabel htmlFor="email" fontWeight={"normal"} color={"#fff"}>
          Email address
        </FormLabel>

        <Input
          id="email"
          type="email"
          color={"#fff"}
          placeholder="example@test.com"
          ref={emailRef}
          onChange={validateEmailName}
          onBlur={onSubmit}
        />
        {!formError.email && (
          <FormHelperText color={"#fff"}>
            We'll never share your email.
          </FormHelperText>
        )}
        <FormErrorMessage>Enter a valid email</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={formError.password} isRequired>
        <FormLabel
          htmlFor="password"
          fontWeight={"normal"}
          mt="2%"
          color={"#fff"}
        >
          Password
        </FormLabel>

        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            color={"#fff"}
            name="password"
            id="password"
            ref={passwordRef}
            onChange={validatePassword}
            onBlur={onSubmit}
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>Minimum length 8</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={formError.passwordsEqual} isRequired>
        <FormLabel
          htmlFor="password2"
          fontWeight={"normal"}
          mt="2%"
          color={"#fff"}
        >
          Confirm Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type="password"
            placeholder="Enter password"
            color={"#fff"}
            name="password2"
            id="password2"
            ref={password2Ref}
            onChange={validatePasswordsEqual}
            onBlur={onSubmit}
          />
        </InputGroup>
        <FormErrorMessage>Password are not equal!</FormErrorMessage>
      </FormControl>
    </>
  );
};

const Form2 = () => {
  return (
    <>
      <Heading
        w="100%"
        textAlign={"center"}
        fontWeight="normal"
        mb="2%"
        color={"#fff"}
      >
        User Details
      </Heading>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          fontWeight="md"
          color={"#fff"}
        >
          Country / Region
        </FormLabel>
        <Select
          id="country"
          name="country"
          autoComplete="country"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          color={"#000"}
        >
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </Select>
      </FormControl>

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="street_address"
          fontSize="sm"
          fontWeight="md"
          color={"#fff"}
          mt="2%"
        >
          Street address
        </FormLabel>
        <Input
          type="text"
          name="street_address"
          id="street_address"
          autoComplete="street-address"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          color={"#fff"}
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
          color={"#fff"}
          mt="2%"
        >
          City
        </FormLabel>
        <Input
          type="text"
          name="city"
          id="city"
          autoComplete="city"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          color={"#fff"}
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="state"
          fontSize="sm"
          fontWeight="md"
          color={"#fff"}
          mt="2%"
        >
          State / Province
        </FormLabel>
        <Input
          type="text"
          name="state"
          id="state"
          autoComplete="state"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="postal_code"
          fontSize="sm"
          fontWeight="md"
          color={"#fff"}
          mt="2%"
        >
          ZIP / Postal
        </FormLabel>
        <Input
          type="text"
          name="postal_code"
          id="postal_code"
          autoComplete="postal-code"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>
    </>
  );
};

const Form3 = () => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" color={"#fff"}>
        Social Handles
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color={"#fff"}
            _dark={{
              color: "gray.50",
            }}
          >
            Website
          </FormLabel>
          <InputGroup size="sm">
            <InputLeftAddon bg="gray.50" color="gray.500" rounded="md">
              http://
            </InputLeftAddon>
            <Input
              type="tel"
              placeholder="www.example.com"
              focusBorderColor="brand.400"
              rounded="md"
              color={"#fff"}
            />
          </InputGroup>
        </FormControl>

        <FormControl id="email" mt={1}>
          <FormLabel fontSize="sm" fontWeight="md" color={"#fff"}>
            About
          </FormLabel>
          <Textarea
            placeholder="you@example.com"
            rows={3}
            shadow="sm"
            focusBorderColor="brand.400"
            fontSize={{
              sm: "sm",
            }}
            color={"#fff"}
          />
          <FormHelperText>
            Brief description for your profile. URLs are hyperlinked.
          </FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

export default function Multistep() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(33.33);
  const [userData, setUserData] = useState({});

  const navigation = useNavigate();

  function getUserData(userData) {
    setUserData(userData);
  }

  async function submitHandler() {
    setIsLoading(true);
    console.log(userData);
    try {
      const result = await fetch("https://autparts.onrender.com/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await result.json();

      if (response.error && response.error.statusCode) {
        const error = new Error("Validation error");
        throw error;
      }

      setIsLoading(false);

      // CHECK IF THERE ARE ERRORS
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setTimeout(() => {
        navigation("/");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Validation error.",
        description:
          "Please make sure you enter valid information into the required fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? (
          <Form1 getData={getUserData} />
        ) : step === 2 ? (
          <Form2 />
        ) : (
          <Form3 />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="red"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="blue"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="green"
                variant="solid"
                onClick={submitHandler}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
