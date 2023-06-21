import { Outlet } from "react-router-dom";
import {
  MdBuild,
  MdAccountCircle,
  MdFavoriteBorder,
  MdAddShoppingCart,
  MdMenu,
} from "react-icons/md";
import {
  Flex,
  Text,
  Icon,
  Input,
  Show,
  Hide,
  Box,
  Button,
  Link,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import LargeWithNewsletter from "../components/Footer";
import AuthModal from "../components/AuthModal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState, clearAuthState } from "../slices/authSlice.js";
import Cart from "../components/Cart";
import SearchModal from "../components/SearchModal";

function Layout() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isAuthModal, setAuthModal] = useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const itemsNum = useSelector((state) => state.cart.itemsCount);
  const navigate = useNavigate();

  function authModalCloseHandler() {
    setAuthModal(false);
  }

  function searchModalCloseHandler() {
    setSearchFocus(false);
  }

  // use effect to initialize auth and keep user logged in if token valid
  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExp = localStorage.getItem("tokenExp");
    const userId = localStorage.getItem("userId");

    if (!token || !tokenExp || !userId) {
      return;
    }

    const tokenExpDate = new Date(tokenExp);
    const now = new Date();

    if (tokenExpDate < now) {
      return;
    }

    dispatch(setAuthState({ token, tokenExp, userId }));
  }, []);

  function logoutHandler() {
    dispatch(clearAuthState());
    navigate("/");
  }

  return (
    <>
      {/* Regular nav */}
      <Flex
        align="center"
        justifyContent="space-between"
        marginTop={0}
        marginBottom={0}
        mr={"auto"}
        ml={"auto"}
        maxWidth={"1100px"}
        paddingTop={2.5}
        paddingBottom={2.5}
        pl={2}
        pr={2}
      >
        <Flex align="center" justifyContent="center" gap={2} cursor="pointer">
          <Link
            as={ReachLink}
            to="/"
            fontSize={["1.4rem", "1.4rem", "1.6rem", "1.6rem", "1.6rem"]}
            fontWeight={700}
            color="#e03131"
            textDecoration={"none"}
          >
            AUTOparts.com
          </Link>
          <Icon
            as={MdBuild}
            w={[3, 4, 5, 7]}
            h={[3, 4, 5, 7]}
            color="gray.500"
          />
        </Flex>

        <Flex
          width={"100%"}
          alignContent={"center"}
          justifyContent={"center"}
          pos={"relative"}
        >
          <Input
            placeholder="search products"
            variant={"outline"}
            size={"md"}
            width={["20%", "30%", "40%", "45%", "80%"]}
            borderColor="#e03131"
            focusBorderColor="#e65a5a"
            borderWidth={2}
            hideBelow={"md"}
            onClick={() => {
              setSearchFocus(true);
            }}
          />
        </Flex>

        <Flex gap={3} alignItems={"center"} justifyContent={"center"}>
          {!isAuth && (
            <Icon
              as={MdAccountCircle}
              w={[3, 4, 5, 7]}
              h={[3, 4, 5, 7]}
              cursor={"pointer"}
              _hover={{ color: "#e03131", transition: "all 0.2s" }}
              hideBelow={"md"}
              onClick={() => {
                setAuthModal(true);
              }}
            />
          )}
          <Icon
            as={MdFavoriteBorder}
            w={[3, 4, 5, 7]}
            h={[3, 4, 5, 7]}
            cursor={"pointer"}
            _hover={{ color: "#e03131", transition: "all 0.2s" }}
            hideBelow={"md"}
          />
          <Box
            display={"flex"}
            alignContent={"center"}
            justifyContent={"center"}
            position={"relative"}
          >
            <Icon
              as={MdAddShoppingCart}
              w={[3, 4, 5, 7]}
              h={[3, 4, 5, 7]}
              cursor={"pointer"}
              _hover={{ color: "#e03131", transition: "all 0.2s" }}
              hideBelow={"md"}
              onClick={() => {
                setCartOpen(true);
              }}
            />
            {itemsNum > 0 && (
              <Box
                position={"absolute"}
                top={0}
                left={0}
                transform={"translateY(-30%) translateX(-30%)"}
                padding={0.5}
                bgColor={"#e03131"}
                borderRadius={"100%"}
                w={5}
                h={5}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                color={"#fff"}
                onClick={() => {
                  setCartOpen(true);
                }}
                hideBelow={"md"}
              >
                {itemsNum}
              </Box>
            )}
          </Box>

          {isAuth && (
            <Link
              as={ReachLink}
              to="/adminPage"
              _hover={{ textDecoration: "none" }}
              hideBelow={"md"}
            >
              <Button colorScheme="red">Admin Settings</Button>
            </Link>
          )}

          {isAuth && (
            <Button colorScheme="red" onClick={logoutHandler} hideBelow={"md"}>
              Logout
            </Button>
          )}
          <Hide above="md">
            <Icon
              as={MdMenu}
              w={[5, 5, 5, 7]}
              h={[5, 5, 5, 7]}
              mr={2}
              cursor={"pointer"}
              _hover={{ color: "#e03131", transition: "all 0.2s" }}
              onClick={() => {
                setMobileNavOpen(true);
              }}
            />
          </Hide>
        </Flex>
      </Flex>

      {/* Mobile nav */}

      <Drawer
        isOpen={isMobileNavOpen}
        placement="right"
        onClose={() => {
          setMobileNavOpen(false);
        }}
      >
        <DrawerOverlay />
        <DrawerContent h={"100%"}>
          <DrawerCloseButton focusBorderColor="#e03131" />

          <Flex
            alignContent={"center"}
            justifyContent={"center"}
            marginTop={10}
            marginBottom={"auto"}
            h={"100%"}
          >
            <Flex
              gap={8}
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              overflowY={"scroll"}
            >
              <Input
                placeholder="search products"
                variant={"outline"}
                size={"md"}
                width={"auto"}
                focusBorderColor="#e03131"
                onClick={() => {
                  setSearchFocus(true);
                  setMobileNavOpen(false);
                }}
              />
              <Icon
                as={MdAccountCircle}
                w={8}
                h={8}
                cursor={"pointer"}
                _hover={{ color: "#e03131", transition: "all 0.2s" }}
                onClick={() => {
                  setMobileNavOpen(false);
                  setAuthModal(true);
                }}
              />
              <Icon
                as={MdFavoriteBorder}
                w={8}
                h={8}
                cursor={"pointer"}
                _hover={{ color: "#e03131", transition: "all 0.2s" }}
              />
              <Icon
                as={MdAddShoppingCart}
                w={8}
                h={8}
                cursor={"pointer"}
                _hover={{ color: "#e03131", transition: "all 0.2s" }}
                onClick={() => {
                  setMobileNavOpen(false);
                  setCartOpen(true);
                }}
              />
              <Link
                as={ReachLink}
                to="/allProducts/engines"
                padding={1.5}
                paddingLeft={7}
                paddingRight={7}
                color={"#000"}
                fontSize={"1.2rem"}
                fontWeight={"600"}
                borderRadius={"1000"}
                _hover={{ bgColor: "#b32727", color: "#fff" }}
              >
                Engines
              </Link>
              <Link
                as={ReachLink}
                to="/"
                padding={1.5}
                paddingLeft={7}
                paddingRight={7}
                color={"#000"}
                fontSize={"1.2rem"}
                fontWeight={"600"}
                borderRadius={"1000"}
                _hover={{ bgColor: "#b32727", color: "#fff" }}
              >
                Brakes
              </Link>
              <Link
                as={ReachLink}
                to="/"
                padding={1.5}
                paddingLeft={7}
                paddingRight={7}
                color={"#000"}
                fontSize={"1.2rem"}
                fontWeight={"600"}
                borderRadius={"1000"}
                _hover={{ bgColor: "#b32727", color: "#fff" }}
              >
                Cooling
              </Link>
              <Link
                as={ReachLink}
                to="/"
                padding={1.5}
                paddingLeft={7}
                paddingRight={7}
                color={"#000"}
                fontSize={"1.2rem"}
                fontWeight={"600"}
                borderRadius={"1000"}
                _hover={{ bgColor: "#b32727", color: "#fff" }}
              >
                Suspension
              </Link>

              <Link
                as={ReachLink}
                to="/"
                padding={1.5}
                paddingLeft={7}
                paddingRight={7}
                color={"#000"}
                fontSize={"1.2rem"}
                fontWeight={"600"}
                borderRadius={"1000"}
                _hover={{ bgColor: "#b32727", color: "#fff" }}
              >
                Accessories
              </Link>
              <Link
                as={ReachLink}
                to="/"
                padding={1.5}
                paddingLeft={7}
                paddingRight={7}
                color={"#000"}
                fontSize={"1.2rem"}
                fontWeight={"600"}
                borderRadius={"1000"}
                _hover={{ bgColor: "#b32727", color: "#fff" }}
              >
                Tires
              </Link>
            </Flex>
          </Flex>
        </DrawerContent>
      </Drawer>

      {/* Cart drawer */}

      <Cart
        open={isCartOpen}
        onClose={() => {
          setCartOpen(false);
        }}
      />

      {/* Search modal */}
      <SearchModal isOpen={searchFocus} close={searchModalCloseHandler} />
      {/* Sign in,log in modal */}

      <AuthModal open={isAuthModal} onClose={authModalCloseHandler} />

      {/* Nav menu  */}

      <Show above="md">
        <Box w={"100%"} bgColor={"#e03131"} boxShadow={"xl"} mb={"10"}>
          <Flex
            alignItems="center"
            justifyContent={"center"}
            marginTop={0}
            marginBottom={0}
            mr={"auto"}
            ml={"auto"}
            maxWidth={"1100px"}
            pl={2}
            pr={2}
          >
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                color={"#fff"}
                bgColor={"#e03131"}
                borderRadius={0}
                _hover={{ bgColor: "#b32727", color: "#fff" }}
                _focus={{ bgColor: "#b32727", color: "#fff" }}
                _active={{ bgColor: "#b32727", color: "#fff" }}
              >
                Categories
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link
                    as={ReachLink}
                    to="/allProducts/engines"
                    _hover={{ textDecor: "none" }}
                  >
                    Engines
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    as={ReachLink}
                    to="/allProducts/brakes"
                    _hover={{ textDecor: "none" }}
                  >
                    Brakes
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    as={ReachLink}
                    to="/allProducts/suspension"
                    _hover={{ textDecor: "none" }}
                  >
                    Suspension
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    as={ReachLink}
                    to="/allProducts/cooling"
                    _hover={{ textDecor: "none" }}
                  >
                    Cooling System
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    as={ReachLink}
                    to="/allProducts/drivetrain"
                    _hover={{ textDecor: "none" }}
                  >
                    Drivetrain
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    as={ReachLink}
                    to="/allProducts/exhaust"
                    _hover={{ textDecor: "none" }}
                  >
                    Exhaust
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    as={ReachLink}
                    to="/allProducts/steering"
                    _hover={{ textDecor: "none" }}
                  >
                    Steering
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
            <Link
              as={ReachLink}
              to="/allProducts/all"
              padding={1.5}
              paddingLeft={7}
              paddingRight={7}
              color={"#fff"}
              fontSize={"1.2rem"}
              fontWeight={"600"}
              _hover={{ bgColor: "#b32727" }}
            >
              All products
            </Link>
            <Link
              as={ReachLink}
              to="/allProducts/engine"
              padding={1.5}
              paddingLeft={7}
              paddingRight={7}
              color={"#fff"}
              fontSize={"1.2rem"}
              fontWeight={"600"}
              _hover={{ bgColor: "#b32727" }}
            >
              Engines
            </Link>
            <Link
              as={ReachLink}
              to="/allProducts/brakes"
              padding={1.5}
              paddingLeft={7}
              paddingRight={7}
              color={"#fff"}
              fontSize={"1.2rem"}
              fontWeight={"600"}
              _hover={{ bgColor: "#b32727" }}
            >
              Brakes
            </Link>
            <Link
              as={ReachLink}
              to="/allProducts/cooling"
              padding={1.5}
              paddingLeft={7}
              paddingRight={7}
              color={"#fff"}
              fontSize={"1.2rem"}
              fontWeight={"600"}
              _hover={{ bgColor: "#b32727" }}
            >
              Cooling
            </Link>
            <Link
              as={ReachLink}
              to="/allProducts/suspension"
              padding={1.5}
              paddingLeft={7}
              paddingRight={7}
              color={"#fff"}
              fontSize={"1.2rem"}
              fontWeight={"600"}
              _hover={{ bgColor: "#b32727" }}
            >
              Suspension
            </Link>
          </Flex>
        </Box>
      </Show>

      <Box overflowX={"hidden"}>
        <Outlet />
      </Box>

      <LargeWithNewsletter />
    </>
  );
}

export default Layout;
