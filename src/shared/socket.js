import SockJS from "sockjs-client";
import Stomp from "stompjs";

const accessToken = document.cookie.split("=")[1];
const token = { Authorization: `${accessToken}` };

const sock = new SockJS("http://3.34.19.50:8080/ws-stomp");
const stomp = Stomp.over(sock);

export const socket = {
  chatConnect: (token) => stomp.connect(token),
  chatDisconnect: () => stomp.disconnect(),
  chatRoomSubscribe: (roomId) =>
    stomp.subscribe(
      `/sub/chat/room/${roomId}`,
      (message) => {
        const responseData = JSON.parse(message.body);
        console.log(responseData);
      },
      token
    ),

  chatSendMSG: (content) => stomp.send("/pub/chat/message", token, content),
};
