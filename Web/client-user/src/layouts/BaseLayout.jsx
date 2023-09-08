import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function BaseLayout(){
  return(
    <>
    <Navbar></Navbar>
    <div className="container">
      <Outlet></Outlet>
    </div>
    </>
  )
}