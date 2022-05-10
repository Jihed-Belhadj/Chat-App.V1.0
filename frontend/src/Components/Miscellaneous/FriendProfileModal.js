import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import FemaleTwoToneIcon from "@mui/icons-material/FemaleTwoTone";
import MaleTwoToneIcon from "@mui/icons-material/MaleTwoTone";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 220,
  bgcolor: "background.paper",
  boxShadow: 20,
  p: 2,
};

export default function FriendProfilModal({ user }) {
  const [openM, setOpenM] = React.useState(false);
  const handleMOpen = () => setOpenM(true);
  const handleMClose = () => setOpenM(false);
  return (
    <div>
      <Box
        onClick={handleMOpen}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <IconButton
            size="small"
            sx={{ ml: 2 }}
            aria-controls={openM ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openM ? "true" : undefined}
          >
            <Avatar
              src={user.profilpic}
              sx={{
                width: 45,
                height: 45,
                backgroundcolor: "blueviolet",
                marginLeft: -3,
              }}
            />
          </IconButton>
        </Box>
      </Box>

      <Modal
        open={openM}
        onClose={handleMClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              height: "30%",
              paddingY: 2,
            }}
          >
            <Avatar
              sx={{
                width: 70,
                height: 70,
              }}
              src={user.profilpic}
            />
            <Typography
              sx={{ width: "70%" }}
              id="modal-modal-title"
              variant="h3"
            >
              {user.username[0]
                .toUpperCase()
                .concat(user.username.slice(1, user.username.length))}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "35%",
              paddingX: 4,
            }}
          >
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Email: {user.email}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingY: 1,
                height: "100%",
              }}
            >
              <Typography
                id="modal-modal-description"
                sx={{
                  mt: 2,
                  width: "20%",
                  height: "100%",
                }}
              >
                Gender:
              </Typography>
              <div
                style={{
                  width: "80%",
                  paddingY: 500,
                  marginTop: 8,
                }}
              >
                {user.gender === "Female" ? (
                  <FemaleTwoToneIcon sx={{ fontSize: 35, color: "pink" }} />
                ) : user.gender === "Male" ? (
                  <MaleTwoToneIcon sx={{ fontSize: 35, color: "blue" }} />
                ) : (
                  <DoNotDisturbOnIcon sx={{ fontSize: 35, color: "Red" }} />
                )}
              </div>
            </Box>
          </Box>
          <Box
            sx={{
              alignContent: "end",
              position: "relative",
              float: "right",
              marginTop: 2,
            }}
          >
            <Button variant="contained" onClick={handleMClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
