import HomeCard from "./HomeProductCard";
("@chakra-ui/react");
import { Grid, Heading } from "@chakra-ui/react";

const CardGrid = (props) => {
  if (props.products.length === 0 || !props.products) {
    return (
      <Heading textAlign={"center"} mt={20} mb={500}>
        No products found!
      </Heading>
    );
  }

  return (
    <Grid
      marginTop={0}
      marginBottom={10}
      mr={"auto"}
      ml={"auto"}
      maxWidth={"1200px"}
      paddingTop={2.5}
      paddingBottom={2.5}
      pl={2}
      pr={2}
      gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
      columnGap={5}
      rowGap={5}
    >
      {props.products.map((product) => (
        <HomeCard
          imageUrl={product.imageUrl}
          title={product.title}
          numCilinders={product.numCilinders}
          capacity={product.capacity}
          power={product.power}
          oil={product.oil}
          price={product.price}
          id={product._id.toString()}
          key={product._id.toString()}
          discount={product.discount}
          discountAmount={product.discountAmount}
          updateMode={props.updateMode}
          deleteMode={props.deleteMode}
          refreshProducts={props.refreshProducts}
          category={product.category}
          brakeSize={product.brakeSize}
          brakeMaterial={product.brakeMaterial}
          coolingPower={product.coolingPower}
          suspensionTravel={product.suspensionTravel}
          suspensionMaterial={product.suspensionMaterial}
        />
      ))}
    </Grid>
  );
};

export default CardGrid;
