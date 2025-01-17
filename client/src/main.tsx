// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
/* ************************************************************************* */

// Import the main app component
import App from "./App";

// Import additional components for new routes
// Try creating these components in the "pages" folder

/**
 * Pages
 */
import AuthPage from "./pages/Auth/AuthPage";
import Avatar from "./pages/Avatar/Avatar";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import GameOne from "./pages/GameOne/GameOne";
import GamesHome from "./pages/GamesHome/GamesHome";
import LevelGame1 from "./pages/LevelGame1/LevelGame1";
import LoginForm from "./pages/LoginForm/LoginForm";
import NotFound from "./pages/Notfound/NotFound";
import NumGame from "./pages/NumGame/NumGame";
import RandomEquation from "./pages/RandomEquation/RandomEquation";
import SignUpForm from "./pages/SignUpForm/SignUpForm";

/**
 * Components
 */
import CarGame from "./components/CarGame";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    path: "/", // The root path
    element: <App />, // Renders the App component for the home page
    children: [
      {
        path: "/", // The root path
        element: <GamesHome />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/levelgame1",
        element: <LevelGame1 />,
      },
      {
        path: "/num-game",
        element: <NumGame />,
      },
      {
        path: "/sign-up",
        element: <SignUpForm />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/car-game",
        element: <CarGame />,
      },
      {
        path: "/authpage",
        element: <AuthPage />,
      },
      {
        path: "/avatar",
        element: <Avatar />,
      },

      {
        path: "/gameone",
        element: <GameOne />,
      },
      {
        path: "/random-equation",
        element: <RandomEquation />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
