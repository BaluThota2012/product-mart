import React from "react";
import { Route, Routes } from "react-router";
import CreateProductModal from "./components/CreateProductModal";
import Dashboard from "./components/Dashboard";
import GlobalErrorPage from "./components/GlobalErrorPage";
import HourglassSpin from "./components/HourglassSpin";
import ListComponent from "./components/ListComponent";
import { LoginComponent } from "./components/LoginComponent";

const AppRoutes = () => {
  return (
    <Routes fallbackElement={< HourglassSpin/>} exceptionElement={<GlobalErrorPage />} >
      <Route path="/" element={<LoginComponent />} />
      <Route path="/products" element={<ListComponent />} errorElement={<GlobalErrorPage />} >
        <Route path=":product_id" element={<Dashboard />} />
        <Route path="delete/:product_id" element={<Dashboard />} />
      </Route>
      <Route path="/products/create" element={<CreateProductModal show={true} mode = {'CREATE'} title={'Create New Product'}/>} />
      <Route path="/products/update" element={<CreateProductModal show={true} mode={'EDIT'} title={'Update Product'} />} />
        
    </Routes>
  );
};

export default AppRoutes;
