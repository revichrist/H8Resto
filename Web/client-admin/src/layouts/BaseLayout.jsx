import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
export default function BaseLayout() {
  return (
    <>
      <NavBar></NavBar>
      <div className="container">
        <Outlet></Outlet>
      </div>
    </>
  );
}
