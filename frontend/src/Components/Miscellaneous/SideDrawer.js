import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { Alert, Avatar, Button, Snackbar, TextField } from "@mui/material";
import ToastMessage from "./ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import ConversationLoading from "../Conversation/ConversationLoading";
import UserListItem from "../Conversation/UserListItem";
import { getallusers } from "../../Redux/actions/authActions";
import { Box } from "@mui/system";
import { getCreateConv } from "../../Redux/actions/convActions";

export default function SideDrawer() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const [loadingConversation, setLoadingConversation] = React.useState(false);
  const [selectedConv, setSelectedConv] = React.useState({});
  const user = useSelector((state) => state.authReducer.user);
  const users = useSelector((state) => state.authReducer.users);
  const conversation = useSelector((state) => state.convReducer.conversation);
  const conversations = useSelector((state) => state.convReducer.conversations);
  const dispatch = useDispatch();

  //conversation loading or access
  const accessConv = (userId) => {
    setLoadingConversation(true);
    dispatch(getCreateConv({ userId }));
    setSelectedConv(conversation);
    setLoadingConversation(false);
  };

  //search function
  const handleSearch = () => {
    if (!search) {
      alert("you must enter a name to search");
      return;
    }
    setLoading(true);
    dispatch(getallusers(search));
    setLoading(false);
    setSearchResult(users);
  };
  //On key press ENTER search input
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  //drawer function
  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(!open);
    setSearchResult([]);
    setSearch("");
  };

  return (
    <div>
      <React.Fragment>
        <IconButton
          color="primary"
          aria-label="open drawer"
          component="span"
          onClick={toggleDrawer}
        >
          <SearchIcon />
        </IconButton>

        <Drawer anchor="left" open={open} onClose={toggleDrawer}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <TextField
              id="search-input"
              onKeyPress={handleKeypress}
              placeholder="Search user by name or email"
              value={search}
              style={{ width: "70%" }}
              onChange={(e) => setSearch(e.target.value)}
            ></TextField>
            <Button
              id="search-button"
              variant="outlined"
              style={{ width: "25%" }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
          <List sx={{ width: 350 }}>
            {loading ? (
              <ConversationLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunc={() => accessConv(user._id)}
                />
              ))
            )}
            <ListItem button></ListItem>
          </List>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
