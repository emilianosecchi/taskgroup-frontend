import { useEffect, useState, createContext } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useAuth } from "../hooks/useAuth";
import {
  fetchAllNotificationsForUser,
  markAllNotificationsAsRead as apiMarkAllNotificationsAsRead,
  markNotificationAsRead as apiMarkNotificationAsRead,
  deleteNotification as apiDeleteNotification,
  deleteAllNotifications as apiDeleteAllNotifications,
} from "../api/Notification";

export const NotificationContext = createContext();

export function NotificationContextProvider({ children }) {
  const [hasNotification, setHasNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { getUserId, getJwtToken } = useAuth();

  useEffect(() => {
    async function fetchNotifications(userId) {
      const response = await fetchAllNotificationsForUser(userId);
      if (response.success) {
        setNotifications(response.notifications);
        for (const n of response.notifications) {
          if (!n.isRead) {
            setHasNotification(true);
            playNotificationSound();
            break;
          }
        }
      }
    }
    const userId = getUserId();
    const jwtToken = getJwtToken();
    fetchNotifications(userId);
    const socket = new SockJS(
      process.env.REACT_APP_BASE_BACKEND_API_URL + "/ws-notifications"
    );
    const stompClient = Stomp.over(socket);
    const connectionHeaders = {
      Authorization: `Bearer ${jwtToken}`,
    };
    stompClient.connect(
      connectionHeaders,
      () => {
        stompClient.subscribe(
          `/topic/user/${userId}/notifications`,
          (notification) => {
            const newNotification = JSON.parse(notification.body);
            console.log(newNotification);
            setHasNotification(true);
            setNotifications((prevNotifications) => [
              ...prevNotifications,
              newNotification,
            ]);
            playNotificationSound();
          }
        );
      },
      (error) => {
        console.log("Error de conexión con el WebSocket: " + error);
      }
    );

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("WebSocket desconectado");
        });
      }
    };
  }, [getUserId, getJwtToken]);

  const playNotificationSound = () => {
    const audio = new Audio("/notification.mp3");
    audio.play();
  };

  const markNotificationAsRead = (notificationId) => {
    const notificationsCopy = Array.from(notifications);
    for (let i = 0; i < notificationsCopy.length; i++) {
      if (notificationsCopy[i].notificationId === notificationId) {
        notificationsCopy[i].isRead = true;
        break;
      }
    }
    setNotifications(notificationsCopy);
    apiMarkNotificationAsRead(notificationId);
  };

  const markAllNotificationsAsRead = () => {
    if (notifications.length > 0) {
      const notificationsCopy = Array.from(notifications);
      notificationsCopy.forEach((n) => (n.isRead = true));
      setNotifications(notificationsCopy);
      apiMarkAllNotificationsAsRead(getUserId());
      setHasNotification(false);
    }
  };

  const deleteNotification = (notificationId) => {
    setNotifications(
      notifications.filter((n) => n.notificationId !== notificationId)
    );
    apiDeleteNotification(notificationId);
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
    setHasNotification(false);
    apiDeleteAllNotifications(getUserId());
  };

  return (
    <NotificationContext.Provider
      value={{
        hasNotification,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        deleteAllNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
