import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import Layout from "./components/layout"
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import styled from "styled-components";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: 
  <ProtectedRoute>
    <Layout />
  </ProtectedRoute>,

  children: [
    {
      path: "",
      element: <Home />
    },
    {
      path: "profile",
      element: <Profile />
    }
  ]
},
{
  path: "/login",
  element: <Login />
},
  {
    path: "/create-account",
    element: <CreateAccount />
  }
]);

const GlobalStyles = createGlobalStyle`
  /* Add your reset styles here */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: white;
    font-family: 'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}
