import { createBrowserRouter, redirect } from "react-router-dom";

import BaseLayout from "../layouts/BaseLayout";
import HomePage from "../pages/HomePage";
import AddAdminPage from "../pages/AddAdminPage";
import AddFoodPage from "../pages/AddFoodPage";
import EditFoodPage from "../pages/EditFoodPage";
import LoginPage from "../pages/LoginPage";
import CategoryPage from "../pages/CategoryPage";
import EditCategoryPage from "../pages/EditCategoryPage";
import AddCategoryPage from "../pages/AddCategoryPage";
import { toast } from "../utils/toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout></BaseLayout>,
    loader: () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        toast('Login first', 'error')
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "",
        element: <HomePage></HomePage>,
      },
      {
        path: "add-food",
        element: <AddFoodPage></AddFoodPage>,
      },
      {
        path: "edit-food/:id",
        element: <EditFoodPage></EditFoodPage>,
      },
      {
        path: "add-admin",
        loader: () => {
          const role = localStorage.getItem('role')

          if(role !== "Admin"){
            toast('You cannot do this action', 'error')
            return redirect('/')
          }
          return null
        },
        element: <AddAdminPage></AddAdminPage>,
      },
      {
        path: "categories",
        element: <CategoryPage></CategoryPage>,
      },
      {
        path: 'add-category',
        element: <AddCategoryPage></AddCategoryPage>
      },
      {
        path: 'edit-category/:id',
        element: <EditCategoryPage></EditCategoryPage>
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
]);

export default router;
