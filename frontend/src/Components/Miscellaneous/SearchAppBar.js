import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SideDrawer from "./SideDrawer";
import ProfilMenu from "./ProfilMenu";

export default function SearchAppBar({ user }) {
  return (
    <Box className="searchtoolbar" sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "white",
          }}
        >
          <SideDrawer></SideDrawer>
          <ProfilMenu user={user}></ProfilMenu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
