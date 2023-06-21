import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout/Layout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage, { loader } from "./pages/HomePage.jsx";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/varela-round";
import CategoryPage from "./pages/CategoryPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import ProductPage from "./pages/ProductPage.jsx";
import { loader as productLoader } from "./pages/ProductPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import { loader as categoryLoader } from "./pages/CategoryPage.jsx";
import UpdatePage from "./pages/UpdatePage.jsx";
import { loader as updateLoader } from "./pages/UpdatePage.jsx";
import { loader as homePageLoader } from "./pages/HomePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homePageLoader,
      },
      {
        path: "/allProducts/:category",
        element: <CategoryPage />,
        loader: categoryLoader,
      },
      {
        path: "/product/:productId",
        element: <ProductPage />,
        loader: productLoader,
      },
      {
        path: "/adminPage",
        element: <AdminPage />,
      },
      {
        path: "/addProduct",
        element: <AddProduct />,
      },
      {
        path: "/updatePage/:productId",
        element: <UpdatePage />,
        loader: updateLoader,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

const theme = extendTheme({
  fonts: {
    heading: "'Varela Round',sans-serif",
    body: "'Varela Round',sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
