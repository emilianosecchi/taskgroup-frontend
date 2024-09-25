import { useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export function Notification() {
  const websocketUrl = "http://localhost:8080/ws-notifications";
  let socket = null;
  let stompClient = null;

  useEffect(() => {
    socket = new SockJS(websocketUrl);
    stompClient = Stomp.over(socket);
    let connectionHeaders = {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    };
    stompClient.connect(connectionHeaders, (frame) => {
      console.log(frame);
    });
  }, []);
  return <></>;
}
