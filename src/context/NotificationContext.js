import { useEffect, useState, createContext } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useAuth } from "../hooks/useAuth";
import {
  fetchAllNotificationsForUser,
  markAllNotificationsAsRead as apiMarkAllNotificationsAsRead,
  markNotificationAsRead as apiMarkNotificationAsRead,
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
            //playNotificationSound();
            break;
          }
        }
      }
    }
    const userId = getUserId();
    const jwtToken = getJwtToken();
    fetchNotifications(userId);
    const websocketUrl =
      process.env.REACT_APP_BASE_BACKEND_API_URL + "/ws-notifications";
    const socket = new SockJS(websocketUrl);
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
            console.log(notification);
            setHasNotification(true);
            setNotifications((prevNotifications) => [
              ...prevNotifications,
              notification,
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
    apiMarkNotificationAsRead(notificationId);
  };

  const markAllNotificationsAsRead = () => {
    apiMarkAllNotificationsAsRead(getUserId());
    setHasNotification(false);
  };

  return (
    <NotificationContext.Provider
      value={{
        hasNotification,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
