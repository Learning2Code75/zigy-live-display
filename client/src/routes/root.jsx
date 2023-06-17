import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Root() {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  //   const handleNavClick = (path) => {
  //     setOpenNav(!openNav);
  //     navigate(path);
  //   };

  return (
    <>
      <Outlet />
    </>
  );
}
