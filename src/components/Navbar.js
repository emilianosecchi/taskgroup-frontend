import { useState } from "react";
import {
  Drawer,
  Badge,
  IconButton,
  Button,
  Typography,
  Toolbar,
  Box,
  AppBar,
  Menu,
  MenuItem,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AddIcon from "@mui/icons-material/Add";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

import { NavListDrawer } from "../components/NavListDrawer";
import { NavbarButton } from "../components/NavbarButton";

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
];

export function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
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
          {navigationLinks.map((navLink, index) => (
            <NavbarButton navLink={navLink} key={index} />
          ))}
          <IconButton
            size="large"
            aria-label="Muestra la cantidad de notificaciones"
            color="inherit"
          >
            <Badge badgeContent={0} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="Configuración del usuario logueado"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
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
