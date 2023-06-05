import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Grid2
        container
        direction="column"
        justifyContent="space-between" //xs below stretches/flex grow div vertically
        alignItems="stretch" ///fill full width
        minHeight="100vh"
        // bgcolor="#F4F5FA"
      >
        <Grid2
          minHeight={pathname !== "/" ? 65 : ""}
          className="back-to-top-anchor"
        >
          <Header />
        </Grid2>

        <Grid2
          xs
          px={pathname !== "/" ? 5 : "auto"}
          py={pathname !== "/" ? 10 : "auto"}
        >
          <Outlet />
        </Grid2>

        <Grid2 xs container flexDirection="column" justifyContent="end">
          <Footer />
        </Grid2>
      </Grid2>
    </>
  );
};

export default Layout;
