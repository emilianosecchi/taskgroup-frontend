import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  List,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";

export function NavListDrawer() {
  return (
    <Box width={250}>
      <nav>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Grupos" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
