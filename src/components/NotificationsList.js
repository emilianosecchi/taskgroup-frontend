import { useEffect, useState } from "react";
import { useNotificationContext } from "../hooks/useNotificationContext";
import {
  IconButton,
  List,
  ListItem,
  Tooltip,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

export function NotificationsList() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } =
    useNotificationContext();

  return (
    <Box
      component="div"
      sx={{
        padding: 3,
        background: "linear-gradient(135deg, #fafdff 0%, #dae7db 100%)",
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Notificaciones</Typography>
      </Box>
      <Divider
        variant="fullWidth"
        sx={{
          marginBottom: "20px",
          marginTop: "20px",
        }}
      ></Divider>
      <List>
        {notifications.map((notification) => (
          <>
            <ListItem
              disablePadding
              key={notification.notificationId}
              secondaryAction={
                <Tooltip title="Marcar como leído" placement="left">
                  <IconButton
                    aria-label="mark as read"
                    onClick={() =>
                      markNotificationAsRead(notification.notificationId)
                    }
                  >
                    <MarkEmailReadIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              {!notification.isRead && (
                <ListItemIcon>
                  <PriorityHighIcon />
                </ListItemIcon>
              )}
              <ListItemText
                inset={notification.isRead}
                primary={notification.message}
                secondary={notification.creationTimestamp}
                primaryTypographyProps={{
                  style: {
                    fontWeight: notification.isRead ? "normal" : "bold",
                  },
                }}
              />
            </ListItem>
            <Divider variant="inset" />
          </>
        ))}
      </List>
    </Box>
  );
}
