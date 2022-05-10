import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function UserListItem({ handleFunc, user }) {
  return (
    <Box
      onClick={handleFunc}
      sx={{
        cursor: "pointer",
        backgroundColor: "#E8E8E8",
        ":hover": {
          backgroundColor: "#3393FF",
          color: "white",
        },
        width: "85%",
        display: "flex",
        alignItems: "center",
        color: "black",
        marginBottom: 2,
        marginLeft: 1,
        paddingX: 2,
        paddingY: 2,
        borderRadius: 2,
      }}
    >
      <Box sx={{width:'20%'}}>
        <Avatar src={user.profilpic} />
      </Box>

      <Box sx={{width:'80%'}}>
        <Typography>{user.username}</Typography>
        <Typography>
          Email: {user.email}
        </Typography>
      </Box>
    </Box>
  );
}

export default UserListItem;
