import { useEffect, useState, createContext } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useAuth } from "../hooks/useAuth";

export const NotificationContext = createContext();

export function NotificationContextProvider({ children }) {
  const [hasNotification, setHasNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { getUserId, getJwtToken } = useAuth();

  useEffect(() => {
    const userId = getUserId();
    const jwtToken = getJwtToken();
    const websocketUrl = "http://localhost:8080/ws-notifications";
    const socket = new SockJS(websocketUrl);
    const stompClient = Stomp.over(socket);
    const connectionHeaders = {
      Authorization: `Bearer ${jwtToken}`,
    };
    stompClient.connect(
      connectionHeaders,
      () => {
        console.log("Conexión establecida");
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
  }, [getUserId, getJwtToken]);

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play();
  };

  const markNotificationAsRead = (idNotification) => {
    // implementar
  };

  const markAllNotificationsAsRead = () => {
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
