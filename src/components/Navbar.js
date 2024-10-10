import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  IconButton,
  Typography,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AddIcon from "@mui/icons-material/Add";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import LogoutIcon from "@mui/icons-material/Logout";

import { NavListDrawer } from "../components/NavListDrawer";
import { NavbarButton } from "../components/NavbarButton";

import { useNotificationContext } from "../hooks/useNotificationContext";

const navigationLinks = [
  {
    title: "Grupos",
    path: null,
    icon: <GroupsIcon />,
    subMenuElements: [
      {
        title: "Crear grupo",
        path: "/groups/create-group",
        icon: <AddIcon />,
      },
      {
        title: "Ver mis grupos",
        path: "/groups/my-groups",
        icon: <ManageSearchIcon />,
      },
    ],
  },
  {
    title: "Tareas",
    path: null,
    icon: <PlaylistAddCheckIcon />,
    subMenuElements: [],
  },
  {
    title: "",
    path: null,
    icon: <AccountCircle />,
    subMenuElements: [
      {
        title: "Cerrar sesión",
        path: "/logout",
        icon: <LogoutIcon />,
      },
    ],
  },
];

export function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { hasNotification } = useNotificationContext();
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            onClick={() => setOpenDrawer(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Taskgroup
          </Typography>
          <IconButton
            aria-label="notifications"
            color={hasNotification ? "warning" : "inherit"}
            size="large"
            sx={{ padding: 3 }}
            onClick={() => {
              navigate("/notifications");
            }}
          >
            {hasNotification ? (
              <NotificationImportantIcon />
            ) : (
              <NotificationsNoneOutlinedIcon />
            )}
          </IconButton>
          {navigationLinks.map((navLink, index) => (
            <NavbarButton navLink={navLink} key={index} />
          ))}
        </Toolbar>
      </AppBar>
      <Drawer
        open={openDrawer}
        anchor="left"
        onClose={() => setOpenDrawer(false)}
      >
        <NavListDrawer />
      </Drawer>
    </Box>
  );
}
