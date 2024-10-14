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
  Grow,
  Fab,
} from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import Swal from "sweetalert2";

export function NotificationsList() {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    deleteAllNotifications,
  } = useNotificationContext();

  const deleteAllNotificationsConfirmDialog = () => {
    Swal.fire({
      title: "Estás seguro?",
      text: "Las notificaciones se borraran permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAllNotifications();
        Swal.fire({
          title: "Éxito",
          text: "Se han borrado las notificaciones.",
          icon: "success",
        });
      }
    });
  };

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
        <Box
          component="div"
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Tooltip
            title="Marcar todas las notificaciones como leídas"
            placement="left"
          >
            <Fab
              aria-label="mark all as read"
              disabled={notifications.length === 0}
              onClick={() => markAllNotificationsAsRead()}
            >
              <MarkEmailReadIcon />
            </Fab>
          </Tooltip>
          <Tooltip
            title="Borrar todas las notificaciones"
            placement="bottom-start"
          >
            <Fab
              aria-label="delete all"
              color="error"
              disabled={notifications.length === 0}
              onClick={() => deleteAllNotificationsConfirmDialog()}
            >
              <DeleteForeverIcon />
            </Fab>
          </Tooltip>
        </Box>
      </Box>
      <Divider
        variant="fullWidth"
        sx={{
          marginBottom: "20px",
          marginTop: "20px",
        }}
      ></Divider>
      {notifications.length > 0 ? (
        <List>
          {notifications.map((notification) => (
            <>
              <ListItem
                disablePadding
                key={notification.notificationId}
                secondaryAction={
                  !notification.isRead ? (
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
                  ) : (
                    <Tooltip title="Borrar notificación" placement="left">
                      <IconButton
                        aria-label="delete"
                        onClick={() =>
                          deleteNotification(notification.notificationId)
                        }
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Tooltip>
                  )
                }
              >
                {!notification.isRead ? (
                  <ListItemIcon>
                    <PriorityHighIcon />
                  </ListItemIcon>
                ) : (
                  <ListItemIcon>
                    <ArrowRightAltIcon />
                  </ListItemIcon>
                )}
                <Grow
                  in={true}
                  style={{ transformOrigin: "0 0 0" }}
                  {...{ timeout: 800 }}
                >
                  <ListItemText
                    primary={notification.message}
                    secondary={notification.creationTimestamp}
                    primaryTypographyProps={{
                      style: {
                        fontWeight: notification.isRead ? "normal" : "bold",
                      },
                    }}
                  />
                </Grow>
              </ListItem>
              <Divider variant="inset" />
            </>
          ))}
        </List>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <DoneAllIcon />
          <Grow
            in={true}
            style={{ transformOrigin: "0 0 0" }}
            {...{ timeout: 800 }}
          >
            <Typography align="center" variant="h5">
              No hay notificaciones
            </Typography>
          </Grow>
        </Box>
      )}
    </Box>
  );
}
