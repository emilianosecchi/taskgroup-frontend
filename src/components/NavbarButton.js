import { Button, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function NavbarButton(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="text"
        id="basic-button"
        key={props.navLink.title}
        color="inherit"
        size="large"
        aria-haspopup="menu"
        startIcon={props.navLink.icon}
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
        sx={{ padding: 3 }}
      >
        {props.navLink.title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {props.navLink.subMenuElements.map((menuElement, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              navigate(menuElement.path);
            }}
          >
            <ListItemIcon>{menuElement.icon}</ListItemIcon>
            {menuElement.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
