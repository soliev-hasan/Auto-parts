import { Box } from "@chakra-ui/react";

const DiscountBox = (props) => {
  return (
    <Box
      position={"absolute"}
      top={0}
      left={0}
      bgColor={"yellow"}
      w={100}
      padding={1}
      borderRadius={10}
      fontWeight={600}
    >
      {props.amount}% Discount,
      <br />
      Limited time offer
    </Box>
  );
};

export default DiscountBox;
