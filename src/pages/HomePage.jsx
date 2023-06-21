import CardGrid from "../components/CardGrid";
import HeadingBox from "../components/HeadingBox";
import { useLoaderData } from "react-router-dom";
export const dummyData = [
  {
    imageUrl:
      "https://vr6parts.com/onlinestore/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/d/s/dscn91741_resize_3.jpg",
    title: "VR6",
    numCilinders: "6",
    capacity: "3.0",
    power: "150",
    oil: "30w",
    price: 1500,
    description:
      "VR6 engines share a common cylinder head for the two banks of cylinders. Only two camshafts are needed for the engine, regardless of whether the engine has two or four valves per cylinder. This simplifies engine construction and reduces costs.",
    _id: "648853745dd0833d63d9de1a",
    miles: "250000",
    discount: true,
    discountAmount: 30,
    category: "Engine",
  },
  {
    imageUrl:
      "https://www.speednik.com/image/2020/07/u-p-garage-redefining-torque-and-response-with-nissans-rb26dett-2020-07-29_14-08-50_035646.jpg",
    title: "rb26",
    numCilinders: "6",
    capacity: "2.6",
    power: "200",
    oil: "30w",
    price: 2000,
    description:
      "The RB26DE engine is a 2.6 L (2,568 cc) Inline-six engine manufactured by Nissan, for use in the 1992 model Nissan Skyline Autech Version R32 sedan.[11][12] The RB26DE engine is made from cast iron, while the cylinder head is made from aluminium alloy, which contains DOHC 4 valves per cylinder (24 valves in total) setup. ",
    _id: "354",
    miles: "10000",
    discount: false,
    discountAmount: 0,
    category: "Engine",
  },
  {
    imageUrl:
      "https://www.karlkustoms.com/wp-content/uploads/2020/07/19419866.jpg",
    title: "LS3",
    numCilinders: "8",
    capacity: "5.0",
    power: "500",
    oil: "30w",
    price: 3600,
    description:
      "The traditional five-bolt pentagonal cylinder head pattern was replaced with a square four-bolt design (much like the 64-90 Oldsmobile V8), and the pistons are of the flat-topped variety (in the LS1, LS2, LS3, LS6, LS7, LQ9, and L33), while all other variants, including the new LS9 and LQ4 truck engine, received a dished version of the GM hypereutectic piston.",
    _id: "222",
    miles: "5000",
    category: "Engine",
    discount: false,
    discountAmount: 0,
  },
];

const HomePage = () => {
  const { products } = useLoaderData();

  console.log(products);

  return (
    <>
      <HeadingBox title={"Popular Engines"} />

      <CardGrid
        products={products.filter((e) => e.category === "engine").slice(0, 3)}
      />

      <HeadingBox title={"Popular Breaking Systems"} />

      <CardGrid
        products={products.filter((e) => e.category === "brakes").slice(0, 3)}
      />

      <HeadingBox title={"Popular Cooling Systems"} />

      <CardGrid
        products={products.filter((e) => e.category === "cooling").slice(0, 3)}
      />
    </>
  );
};

export default HomePage;

export async function loader() {
  try {
    const result = await fetch(
      "https://autparts.onrender.com/products/allProducts/all"
    );

    const data = await result.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}
