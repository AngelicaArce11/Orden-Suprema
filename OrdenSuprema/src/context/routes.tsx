// routes.ts
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from '../components/LoginForm.tsx';
import { FormAssassin } from '../components/HighTable/FormAssassin.tsx';
import { HighProfile } from '../components/HighTable/HighProfile.tsx';
import { History } from '../components/HighTable/History.tsx';

const RoutesConfig = createBrowserRouter([
  {
    path: "/",
    element: <Login />, 
    children: [
      {
        path: "/loginForm",
        element: <Login />,  
      },
      {
        path: "/formAssassin",
        element: <FormAssassin />,  
      },
      {
        path: "/highProfile",
        element: <HighProfile />,
      },
      {
        path: "/history",
        element: <History />,
      }
    ],
  },
]);

export const RoutesComponent = () => (
  <RouterProvider router={RoutesConfig} />  
);
