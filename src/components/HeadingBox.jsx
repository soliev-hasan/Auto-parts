import { Box, Heading } from "@chakra-ui/react";
import imageUrl from "../public/circle.svg";
const HeadingBox = (props) => {
  return (
    <Box
      position={"relative"}
      width={"100%s"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Heading
        zIndex={10}
        position={"relative"}
        bgColor={"#fff"}
        width={"fit-content"}
        pr={3}
        pl={3}
      >
        {props.title}
      </Heading>
      <Box
        bgImage={`url(${imageUrl})`}
        width={"100%"}
        position={"absolute"}
        height={10}
        top={0}
        left={0}
        zIndex={-1000}
        bgSize={"13px"}
        opacity={"0.3"}
      ></Box>
    </Box>
  );
};

export default HeadingBox;
