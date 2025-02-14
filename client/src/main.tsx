// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Context/AuthContext";
import { AvatarProvider } from "./Context/AvatarContext";
import api from "./services/api";
import "./index.css";
/* ************************************************************************* */

// Import the main app component
import App from "./App";

import AuthPage from "./pages/Auth/AuthPage";
import Avatar from "./pages/Avatar/Avatar";
// Import additional components for new routes
// Try creating these components in the "pages" folder

import Bonus from "./pages/BonusGame/BonusGame";
import CarGame from "./pages/CarGame/CarGame";
import Contact from "./pages/Contact/Contact";
import Dashboard from "./pages/DashBoard/DashBoard";
import GameOne from "./pages/GameOne/GameOne";
import GamesHome from "./pages/GamesHome/GamesHome";
import LevelGame1 from "./pages/LevelGame1/LevelGame1";
import LevelGame2 from "./pages/LevelGame2/LevelGame2";
import LoginForm from "./pages/LoginForm/LoginForm";
import NotFound from "./pages/Notfound/NotFound";
import NumGame from "./pages/NumGame/NumGame";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import RandomEquation from "./pages/RandomEquation/RandomEquation";
import SignUpForm from "./pages/SignUpForm/SignUpForm";

/**
 * Components
 */
import EuroGame from "./components/EuroGame";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/gameshome/:id",
        element: <GamesHome />,
        loader: async ({ params }) => {
          try {
            const response = await api.get(`/api/avatar/${params.id}`);
            /**
             * !todo
             * Si c'est mon petit, alors tu return response.data,
             * sinon, go ma liste d'enfant
             */
            return response.data;
          } catch (error) {
            console.error(error);
            window.location.href = "/login";
            return null;
          }
        },
      },
      {
        path: "/avatar",
        element: <Avatar />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/sign-up",
        element: <SignUpForm />,
      },
      {
        path: "/authpage",
        element: <AuthPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <GamesHome />,
          },
          {
            path: "/bonus-game/:name/",
            element: <Bonus />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/contact",
            element: <Contact />,
          },
          {
            path: "/random-equation/:name/",
            element: <RandomEquation />,
          },
          {
            path: "/levelgame1/:name/",
            element: <LevelGame1 />,
          },

          {
            path: "/levelgame2/:name/",
            element: <LevelGame2 />,
          },
          {
            path: "/game-one/:name/",
            element: <GameOne />,
          },
          {
            path: "/num-game/:name/",
            element: <NumGame />,
          },
          {
            path: "/car-game/:name",
            element: <CarGame />,
          },
          {
            path: "/car-game",
            element: <CarGame />,
          },
          {
            path: "/euro-game/:name",
            element: <EuroGame />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/cart",
            element: <GamesHome />,
          },
        ],
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
    <AuthProvider>
      <AvatarProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AvatarProvider>
    </AuthProvider>
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
