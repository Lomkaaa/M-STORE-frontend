import { CategoriesBrandsForm} from "@/features/ManageCategoryBrand/ui/CategoryBrandForm";
import { AddProductForm } from "@/features/manageProduct-admin/ui/createProduct/CreateProductForm";
import { DeleteProduct } from "@/features/manageProduct-admin/ui/deleteProduct/DeleteProduct";
import { UpdateProduct } from "@/features/manageProduct-admin/ui/updateProduct/UpdateProduct";
import { AdminPanel } from "@/widgets/adminPanel/AdminPanel";
import { AdminRoute } from "@/shared/routes/AdminRoute";
import { Route } from "react-router-dom";



export const AdminRoutes = (
    <Route element={<AdminRoute />}>
      <Route path="/admin" element={<AdminPanel/>}/>
      <Route path="/admin/products/app" element={<AddProductForm/>} />
      <Route path="/admin/products/delete" element={<DeleteProduct/>} />
      <Route path="/admin/products/update" element={<UpdateProduct/>} />
      <Route path="/admin/products/category" element={<CategoriesBrandsForm/>} />
      <Route path="/admin/users" element={0} />
      <Route path="/admin/orders" element={0}/>
    </Route>
  );