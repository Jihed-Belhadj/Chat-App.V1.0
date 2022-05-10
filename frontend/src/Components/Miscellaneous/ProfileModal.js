import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar, IconButton } from "@mui/material";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProfilModal({ user }) {
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
              sx={{
                width: 25,
                height: 25,
                backgroundcolor: "blueviolet",
                marginLeft: -3,
              }}
            >
              {user.username[0].toUpperCase()}
            </Avatar>
          </IconButton>
          My Profile
        </Box>
      </Box>

      <Modal
        open={openM}
        onClose={handleMClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
