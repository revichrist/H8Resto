import { createBrowserRouter } from "react-router-dom";

import BaseLayout from "../layouts/BaseLayout";
import HomePage from "../pages/HomePage";
import DetailProductPage from "../pages/DetailProductPage";
import ProductPage from "../pages/ProductPage";
import UnderMaintenancePage from "../pages/UnderMaintenancePage";

const router = createBrowserRouter([
  {
    element: <BaseLayout></BaseLayout>,
    children: 
    [
      {
        path: '',
        element: <HomePage></HomePage>
      },
      {
        path: 'product',
        element: <ProductPage></ProductPage>
      },
      {
        path: 'product/:id',
        element: <DetailProductPage></DetailProductPage>
      },
      {
        path: 'maintenance',
        element: <UnderMaintenancePage></UnderMaintenancePage>
      }
    ]
  }
])

export default router