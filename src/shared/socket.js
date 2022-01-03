import SockJS from "sockjs-client";
import Stomp from "stompjs";

const accessToken = document.cookie.split("=")[1];
const token = { Authorization: `${accessToken}` };

const sock = new SockJS("http://13.125.249.172/ws-stomp");
const stomp = Stomp.over(sock);

export const socket = {
  chatConnect: () => stomp.connect(token),
  chatRoomSubscribe: (roomId) =>
    stomp.subscribe(`/sub/chat/room/${roomId}`, token),

  chatSendMSG: () => stomp.send(`/pub/chat/message`, token),
};
