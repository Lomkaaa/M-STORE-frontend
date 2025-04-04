import { Route } from "react-router-dom";
import PrivateRoute from "@/shared/routes/PrivateRoute";
import Home from "@/pages/home/Home";
import { ProductDetails } from "@/widgets/productDetails/ProductDetails";
import { FavoritePage } from "@/pages/favorite/FavoritePage";
import { BasketPage } from "@/pages/basket/BasketPage";
import { HistoryPage } from "@/pages/history/HistoryPage";
import { OrderPage } from "@/pages/order/OrderPage";
import { Profile } from "@/pages/profile/Profile";


export const PrivateRoutes = (
  <Route element={<PrivateRoute />}>
    <Route path="/profile" element={<Profile/>} />
    <Route path="/" element={<Home/>} />
    <Route path="/basket" element={<BasketPage/>}/>
    <Route path="/products/:id" element={<ProductDetails/>}/>
    <Route path="/favorites" element={<FavoritePage/>}/>
    <Route path="/history" element={<HistoryPage/>}/>
    <Route path="/orders" element={<OrderPage/>}/>
  </Route>
);