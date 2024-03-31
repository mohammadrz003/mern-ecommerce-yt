import { Routes, Route } from "react-router-dom";

import "./App.css";
import HomeScreen from "./pages/home/HomeScreen";
import SingleProductScreen from "./pages/single-product/SingleProductScreen";
import CartScreen from "./pages/cart/CartScreen";
import LoginScreen from "./pages/login/LoginScreen";
import RegisterScreen from "./pages/register/RegisterScreen";
import ProfileScreen from "./pages/profile/ProfileScreen";
import ShippingScreen from "./pages/shipping/ShippingScreen";
import PaymentScreen from "./pages/payment/PaymentScreen";
import PlaceOrderScreen from "./pages/placeorder/PlaceOrderScreen";
import OrderScreen from "./pages/order/OrderScreen";
import UserListScreen from "./pages/user-list/UserListScreen";
import UserEditScreen from "./pages/user-edit/UserEditScreen";
import ProductListScreen from "./pages/product-list/ProductListScreen";
import ProductEditScreen from "./pages/product-edit/ProductEditScreen";
import OrderListScreen from "./pages/order-list/OrderListScreen";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/page/:pageNumber" element={<HomeScreen />} />
        <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
        <Route path="/search/:keyword" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/product/:id" element={<SingleProductScreen />} />
        <Route path="/cart">
          <Route index element={<CartScreen />} />
          <Route path=":id" element={<CartScreen />} />
        </Route>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/admin/userlist" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
      </Routes>
    </div>
  );
}

export default App;
