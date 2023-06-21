import { Button, Heading } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Flex,
  Input,
} from "@chakra-ui/react";
import { Select, Textarea } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AddProduct = (props) => {
  // request protection
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  // add token to request,add user id to each product,so a user may only delete his products

  // route protection
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const [isDiscount, setIsDiscount] = useState(false);

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
  //

  const [formType, setFormType] = useState(
    props.isUpdateMode ? props.product.category : "engine"
  );
  const formTypeRef = useRef();
  const toast = useToast();

  const [formError, setFormError] = useState({
    titleError: false,
    priceError: false,
    suspensionTravelError: false,
    suspensionMaterialError: false,
    coolingPowerError: false,
    brakeSizeError: false,
    brakeMaterialError: false,
    numCilindersError: false,
    engineCapacityError: false,
    enginePowerError: false,
    engineOilError: false,
    descriptionError: false,
    milesError: false,
    imageError: false,
    discountAmountError: false,
  });

  const titleRef = useRef();
  const priceRef = useRef();
  const suspensionTravelRef = useRef();
  const suspensionMaterialRef = useRef();
  const coolingPowerRef = useRef();
  const brakeSizeRef = useRef();
  const brakeMaterialRef = useRef();
  const numCilindersRef = useRef();
  const engineCapacityRef = useRef();
  const enginePowerRef = useRef();
  const engineOilRef = useRef();
  const descriptionRef = useRef();
  const milesRef = useRef();
  const imageRef = useRef();
  const discountRef = useRef();
  const discountAmountRef = useRef();

  function successToast() {
    toast({
      title: "Product added.",
      description: "New product added",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }

  // DO VALIDATION

  function discountHandler(e) {
    const discount = e.target.value;

    if (discount === "true") {
      setIsDiscount(true);
    }

    if (discount === "false") {
      setIsDiscount(false);
    }
  }

  function discountAmountHandler() {
    const value = discountAmountRef.current.value;

    if (Number(value) < 1) {
      setFormError((prevState) => {
        return {
          ...prevState,
          discountAmountError: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          discountAmountError: false,
        };
      });
    }
  }

  function titleHandler() {
    const title = titleRef.current.value;
    if (title.length < 1) {
      setFormError((prevState) => {
        return {
          ...prevState,
          titleError: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          titleError: false,
        };
      });
    }
  }
  function priceHandler() {
    const price = priceRef.current.value;
    if (Number(price) < 1) {
      setFormError((prevState) => {
        return {
          ...prevState,
          priceError: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          priceError: false,
        };
      });
    }
  }
  function suspensionTravelHandler() {
    const suspensionTravel = suspensionTravelRef.current.value;
    if (Number(suspensionTravel) < 50) {
      setFormError((prevState) => {
        return {
          ...prevState,
          suspensionTravelError: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          suspensionTravelError: false,
        };
      });
    }
  }
  function suspensionMaterialHandler() {
    const suspensionMaterial = suspensionMaterialRef.current.value;
    if (suspensionMaterial.length < 1) {
      setFormError((prevState) => {
        return {
          ...prevState,
          suspensionMaterialError: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          suspensionMaterialError: false,
        };
      });
    }
  }
  function coolingPowerHandler() {
    const coolingPower = coolingPowerRef.current.value;
    if (Number(coolingPower) < 1) {
      setFormError((prevState) => {
        return {
          ...prevState,
          coolingPowerError: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          coolingPowerError: false,
        };
      });
    }
  }
  function brakeSizeHandler() {
    const brakeSize = brakeSizeRef.current.value;
    if (Number(brakeSize) < 1) {
      setFormError((prevState) => {
        return {
          ...prevState,
          brakeSizeError: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          brakeSizeError: false,
        };
      });
    }
  }
  function brakeMaterialHandler() {
    const brakeMaterial = brakeMaterialRef.current.value;
    if (brakeMaterial.length < 1) {
      setFormError((prevState) => {
        return {
          ...prevState,
          brakeMaterialError: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          brakeMaterialError: false,
        };
      });
    }
  }
  function numCilindersHandler() {
    const numCilinders = numCilindersRef.current.value;
    if (Number(numCilinders) < 1) {
      setFormError((prevState) => {
        return {
          ...prevState,
          numCilindersError: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          numCilindersError: false,
        };
      });
    }
  }
  function engineCapacityHandler() {
    const engineCapacity = engineCapacityRef.current.value;
    if (Number(engineCapacity) < 1) {
      setFormError((prevState) => {
        return {
          ...prevState,
          engineCapacityError: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          engineCapacityError: false,
        };
      });
    }
  }
  function enginePowerHandler() {
    const enginePower = enginePowerRef.current.value;
    if (Number(enginePower) < 1) {
      setFormError((prevState) => {
        return {
          ...prevState,
          enginePowerError: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          enginePowerError: false,
        };
      });
    }
  }
  function engineOilHandler() {
    const engineOil = engineOilRef.current.value;
    if (!engineOil.includes("w")) {
      setFormError((prevState) => {
        return {
          ...prevState,
          engineOilError: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          engineOilError: false,
        };
      });
    }
  }
  function descriptionHandler() {
    const description = descriptionRef.current.value;
    if (description.length < 10) {
      setFormError((prevState) => {
        return {
          ...prevState,
          descriptionError: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          descriptionError: false,
        };
      });
    }
  }
  function milesHandler() {
    const miles = milesRef.current.value;
    if (Number(miles) < 1) {
      setFormError((prevState) => {
        return {
          ...prevState,
          milesError: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          milesError: false,
        };
      });
    }
  }
  function imageHandler() {
    const image = imageRef.current.value;
    if (Number(image) < 1) {
      setFormError((prevState) => {
        return {
          ...prevState,
          imageError: true,
        };
      });
    } else {
      setFormError((prevState) => {
        return {
          ...prevState,
          imageError: false,
        };
      });
    }
  }

  async function submitHandler() {
    const title = titleRef.current.value;
    const price = Number(priceRef.current.value);
    const description = descriptionRef.current.value;
    const imageUrl = imageRef.current.value;
    const id = props.isUpdateMode ? props.product._id : "";
    const discount = isDiscount;
    const discountAmount = isDiscount ? discountAmountRef.current.value : 0;

    const method = props.isUpdateMode ? "PATCH" : "POST";
    const path = props.isUpdateMode ? "update" : "add";

    if (
      formError.titleError ||
      formError.priceError ||
      formError.suspensionTravelError ||
      formError.suspensionMaterialError ||
      formError.coolingPowerError ||
      formError.brakeSizeError ||
      formError.brakeMaterialError ||
      formError.numCilindersError ||
      formError.engineCapacityError ||
      formError.enginePowerError ||
      formError.engineOilError ||
      formError.descriptionError ||
      formError.milesError ||
      formError.imageError ||
      formError.discountAmountError
    ) {
      toast({
        title: "Input error.",
        description: "Make sure all inputs are correct.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      if (formType === "engine") {
        const numCilinders = numCilindersRef.current.value;
        const engineCapacity = engineCapacityRef.current.value;
        const enginePower = enginePowerRef.current.value;
        const engineOil = engineOilRef.current.value;
        const miles = milesRef.current.value;

        const newEngine = {
          title: title,
          price: price,
          description: description,
          imageUrl: imageUrl,
          numCilinders: numCilinders,
          capacity: engineCapacity,
          power: enginePower,
          oil: engineOil,
          miles: miles,
          category: "engine",
          discount: discount,
          discountAmount: discountAmount,
          userId: userId,
        };

        if (props.isUpdateMode) {
          newEngine._id = id;
        }

        const result = await fetch(`https://autparts.onrender.com/products/${path}`, {
          method: method,
          body: JSON.stringify({ product: newEngine }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (result.status !== 200) {
          throw new Error("Product could not be added!");
        }

        const data = await result.json();

        successToast();
        navigate("/adminPage");
        return;
      }

      if (formType === "brakes") {
        const brakeSize = brakeSizeRef.current.value;
        const brakeMaterial = brakeMaterialRef.current.value;

        const newBrakes = {
          title: title,
          price: price,
          description: description,
          imageUrl: imageUrl,
          brakeSize: brakeSize,
          brakeMaterial: brakeMaterial,
          category: "brakes",
          discount: discount,
          discountAmount: discountAmount,
          userId: userId,
        };

        if (props.isUpdateMode) {
          newBrakes._id = id;
        }

        const result = await fetch(`https://autparts.onrender.com/products/${path}`, {
          method: method,
          body: JSON.stringify({ product: newBrakes }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (result.status !== 200) {
          throw new Error("Product could not be added!");
        }

        console.log(newBrakes);

        successToast();
        navigate("/adminPage");

        return;
      }

      if (formType === "cooling") {
        const coolingPower = coolingPowerRef.current.value;

        const newCooling = {
          title: title,
          price: price,
          description: description,
          imageUrl: imageUrl,
          coolingPower: coolingPower,
          category: "cooling",
          discount: discount,
          discountAmount: discountAmount,
          userId: userId,
        };

        if (props.isUpdateMode) {
          newCooling._id = id;
        }

        const result = await fetch(`https://autparts.onrender.com/products/${path}`, {
          method: method,
          body: JSON.stringify({ product: newCooling }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (result.status !== 200) {
          throw new Error("Product could not be added!");
        }
        console.log(newCooling);

        successToast();
        navigate("/adminPage");

        return;
      }

      if (formType === "suspension") {
        const suspensionTravel = suspensionTravelRef.current.value;
        const suspensionMaterial = suspensionMaterialRef.current.value;

        const newSuspension = {
          title: title,
          price: price,
          description: description,
          imageUrl: imageUrl,
          suspensionTravel: suspensionTravel,
          suspensionMaterial: suspensionMaterial,
          category: "suspension",
          discount: discount,
          discountAmount: discountAmount,
          userId: userId,
        };

        if (props.isUpdateMode) {
          newSuspension._id = id;
        }

        console.log(newSuspension);

        const result = await fetch(`https://autparts.onrender.com/products/${path}`, {
          method: method,
          body: JSON.stringify({ product: newSuspension }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (result.status !== 200) {
          throw new Error("Product could not be added!");
        }

        successToast();
        navigate("/adminPage");

        return;
      }
    } catch (err) {
      toast({
        title: "Input error.",
        description: err.message || "Server error try again later",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  function formTypeHandler() {
    const type = formTypeRef.current.value;
    console.log(type);
    if (type === "") {
      setFormType("engine");
      return;
    }
    setFormType(type);
  }

  return (
    <Box
      marginTop={0}
      marginBottom={10}
      mr={"auto"}
      ml={"auto"}
      maxWidth={"1100px"}
      display={"flex"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Flex
        w={"80%"}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={5}
      >
        <Heading>Add product</Heading>

        <FormControl>
          <FormLabel>Product category</FormLabel>
          <Select
            placeholder="Select type"
            ref={formTypeRef}
            onChange={formTypeHandler}
          >
            <option
              value="engine"
              selected={
                props.isUpdateMode && props.product.category === "engine"
                  ? true
                  : false
              }
            >
              Engine
            </option>
            <option
              value="brakes"
              selected={
                props.isUpdateMode && props.product.category === "brakes"
                  ? true
                  : false
              }
            >
              Brakes
            </option>
            <option
              value="cooling"
              selected={
                props.isUpdateMode && props.product.category === "cooling"
                  ? true
                  : false
              }
            >
              Cooling
            </option>
            <option
              value="suspension"
              selected={
                props.isUpdateMode && props.product.category === "suspension"
                  ? true
                  : false
              }
            >
              Suspension
            </option>
          </Select>
        </FormControl>

        <FormControl isInvalid={formError.titleError}>
          <FormLabel>Product title</FormLabel>
          <Input
            type="text"
            maxLength={20}
            minLength={1}
            ref={titleRef}
            onBlur={titleHandler}
            defaultValue={props.isUpdateMode ? props.product.title : ""}
          ></Input>
          <FormErrorMessage>Please input a valid title.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formError.priceError}>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            min={1}
            max={10000}
            ref={priceRef}
            onBlur={priceHandler}
            defaultValue={props.isUpdateMode ? props.product.price : ""}
          />
          <FormErrorMessage>
            Price can't be less than 1 or greater than 10000.
          </FormErrorMessage>
        </FormControl>

        {formType === "suspension" && (
          <FormControl isInvalid={formError.suspensionTravelError}>
            <FormLabel>Travel in mm</FormLabel>
            <Input
              type="number"
              min={50}
              max={1000}
              ref={suspensionTravelRef}
              onBlur={suspensionTravelHandler}
              defaultValue={
                props.isUpdateMode && props.product.category === "suspension"
                  ? props.product.suspensionTravel
                  : ""
              }
            ></Input>
            <FormErrorMessage>
              Suspension travel can be between 50 and 1000 milimiters
            </FormErrorMessage>
          </FormControl>
        )}

        {formType === "suspension" && (
          <FormControl isInvalid={formError.suspensionMaterialError}>
            <FormLabel>Material used(e.g aluminum,steel,carbon)</FormLabel>
            <Input
              type="text"
              ref={suspensionMaterialRef}
              onBlur={suspensionMaterialHandler}
              minLength={1}
              maxLength={20}
              defaultValue={
                props.isUpdateMode && props.product.category === "suspension"
                  ? props.product.suspensionMaterial
                  : ""
              }
            ></Input>
            <FormErrorMessage>Please input a valid material.</FormErrorMessage>
          </FormControl>
        )}

        {formType === "cooling" && (
          <FormControl isInvalid={formError.coolingPowerError}>
            <FormLabel>Max power in HP</FormLabel>
            <Input
              type="text"
              minLength={1}
              maxLength={20}
              ref={coolingPowerRef}
              onBlur={coolingPowerHandler}
              defaultValue={
                props.isUpdateMode && props.product.category === "cooling"
                  ? props.product.coolingPower
                  : ""
              }
            ></Input>
            <FormErrorMessage>
              Please input a valid amount of heat the cooling system can
              dissipate.
            </FormErrorMessage>
          </FormControl>
        )}

        {formType === "brakes" && (
          <FormControl isInvalid={formError.brakeSizeError}>
            <FormLabel>Size in mm</FormLabel>
            <Input
              type="number"
              ref={brakeSizeRef}
              onBlur={brakeSizeHandler}
              defaultValue={
                props.isUpdateMode && props.product.category === "brakes"
                  ? props.product.brakeSize
                  : ""
              }
            />
            <FormErrorMessage>
              Brake size can not be less than 1 milimiter.
            </FormErrorMessage>
          </FormControl>
        )}

        {formType === "brakes" && (
          <FormControl isInvalid={formError.brakeMaterialError}>
            <FormLabel>Material used(e.g aluminum,steel,carbon)</FormLabel>
            <Input
              type="text"
              minLength={1}
              maxLength={20}
              ref={brakeMaterialRef}
              onBlur={brakeMaterialHandler}
              defaultValue={
                props.isUpdateMode && props.product.category === "brakes"
                  ? props.product.brakeMaterial
                  : ""
              }
            ></Input>
            <FormErrorMessage>Please input a valid material.</FormErrorMessage>
          </FormControl>
        )}

        {formType === "engine" && (
          <FormControl isInvalid={formError.numCilindersError}>
            <FormLabel>Number of cilinders</FormLabel>
            <Input
              type="number"
              min={1}
              max={24}
              ref={numCilindersRef}
              onBlur={numCilindersHandler}
              defaultValue={
                props.isUpdateMode && props.product.category === "engine"
                  ? props.product.numCilinders
                  : ""
              }
            />
            <FormErrorMessage>
              Number of cilinders can be between 1 and 24.
            </FormErrorMessage>
          </FormControl>
        )}

        {formType === "engine" && (
          <FormControl isInvalid={formError.engineCapacityError}>
            <FormLabel>Engine Capacity in Liters</FormLabel>
            <Input
              type="number"
              min={1}
              max={24}
              ref={engineCapacityRef}
              onBlur={engineCapacityHandler}
              defaultValue={
                props.isUpdateMode && props.product.category === "engine"
                  ? props.product.capacity
                  : ""
              }
            ></Input>
            <FormErrorMessage>
              Please input a valid number between 1 and 24.
            </FormErrorMessage>
          </FormControl>
        )}

        {formType === "engine" && (
          <FormControl isInvalid={formError.enginePowerError}>
            <FormLabel>Engine power in HP</FormLabel>
            <Input
              min={1}
              max={1000}
              ref={enginePowerRef}
              onBlur={enginePowerHandler}
              defaultValue={
                props.isUpdateMode && props.product.category === "engine"
                  ? props.product.power
                  : ""
              }
            ></Input>
            <FormErrorMessage>
              Engine power ranges from 1 to 1000 HP in factory built engines.
            </FormErrorMessage>
          </FormControl>
        )}

        {formType === "engine" && (
          <FormControl isInvalid={formError.engineOilError}>
            <FormLabel>Engine oil</FormLabel>
            <Input
              type="text"
              maxLength={10}
              ref={engineOilRef}
              onBlur={engineOilHandler}
              placeholder="Example 5w40"
              defaultValue={
                props.isUpdateMode && props.product.category === "engine"
                  ? props.product.oil
                  : ""
              }
            ></Input>
            <FormErrorMessage>
              Please input a valid engine oil specification(5w40,20w30,10w50).
            </FormErrorMessage>
          </FormControl>
        )}

        {props.isUpdateMode && (
          <FormControl>
            <FormLabel>Discount</FormLabel>
            <Select
              placeholder="Is this product discounted"
              defaultValue={"false"}
              ref={discountRef}
              onChange={discountHandler}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
            <FormErrorMessage>Please select a valid option</FormErrorMessage>
          </FormControl>
        )}

        {props.isUpdateMode && isDiscount && (
          <FormControl isInvalid={formError.discountAmountError}>
            <FormLabel>Discount Amount</FormLabel>
            <Input
              min={1}
              max={1000}
              ref={discountAmountRef}
              onBlur={discountAmountHandler}
              defaultValue={
                props.isUpdateMode ? props.product.discountAmount : ""
              }
            ></Input>
            <FormErrorMessage>Enter a valid amount</FormErrorMessage>
          </FormControl>
        )}

        <FormControl isInvalid={formError.descriptionError}>
          <FormLabel>Description</FormLabel>
          <Textarea
            maxLength={200}
            minLength={10}
            ref={descriptionRef}
            onBlur={descriptionHandler}
            h={"md"}
            placeholder="Minimum length 10,maximum 200"
            defaultValue={props.isUpdateMode ? props.product.description : ""}
          ></Textarea>
          <FormErrorMessage>Please describe the new product.</FormErrorMessage>
        </FormControl>

        {formType === "engine" && (
          <FormControl isInvalid={formError.milesError}>
            <FormLabel>Miles</FormLabel>
            <Input
              type="number"
              minLength={1}
              ref={milesRef}
              onBlur={milesHandler}
              defaultValue={
                props.isUpdateMode && props.product.category === "engine"
                  ? props.product.miles
                  : ""
              }
            ></Input>
            <FormErrorMessage>
              Engine milage can not be less than 1.
            </FormErrorMessage>
          </FormControl>
        )}

        <FormControl isInvalid={formError.imageError}>
          <FormLabel>Image Url</FormLabel>
          <Input
            type="text"
            minLength={1}
            ref={imageRef}
            onBlur={imageHandler}
            defaultValue={props.isUpdateMode ? props.product.imageUrl : ""}
          ></Input>
          <FormErrorMessage>Please input a valid url.</FormErrorMessage>
        </FormControl>
        {!props.isUpdateMode && (
          <Button colorScheme="red" onClick={submitHandler}>
            Submit
          </Button>
        )}
        {props.isUpdateMode && (
          <Button colorScheme="green" onClick={submitHandler}>
            Update
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default AddProduct;
