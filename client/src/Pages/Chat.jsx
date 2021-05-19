import React, { useState, useEffect } from "react";
import HomeHelper from "../Components/HomeHelper";
import { useSelector, useDispatch } from "react-redux";
import {
  sendMessage,
  getPrivateConversation,
  getPrivateConversation2,
} from "../redux/action/studentAction";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import { Base_url } from "../Config/Api";

//Swap HelperFunction
function swap(input, value_1, value_2) {
  var temp = input[value_1];
  input[value_1] = input[value_2];
  input[value_2] = temp;
}

let socket;

const Chat = (props) => {
  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();
  const [room1, setRoom1] = useState("");
  const [room2, setRoom2] = useState("");
  const [receiverRegistrationNumber, setReceiverRegistrationNumber] =
    useState("");
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const [olderMessages, setOlderMessages] = useState([]);
  const ENDPOINT = Base_url;

  useEffect(() => {
    let temp = props.match.params.room;
    socket = io(ENDPOINT);
    let tempArr = temp.split(".");
    setReceiverRegistrationNumber(tempArr[0]);
    setRoom1(temp);
    swap(tempArr, 0, 1);
    let tempRoom2 = tempArr[0] + "." + tempArr[1];
    setRoom2(tempRoom2);
  }, [ENDPOINT, props.match.params.room]);

  useEffect(() => {
    dispatch(getPrivateConversation(room1));
    dispatch(getPrivateConversation2(room2));
    socket = io(ENDPOINT);
    socket.emit("join room", {
      room1,
      room2,
    });
    socket.on("new Message", (data) => {
      console.log(data);
      new Audio(
        "https://d6cp9b00-a.akamaihd.net/downloads/ringtones/files/dl/mp3/beep-para-celular-30244.mp3"
      ).play();
      setMessageArray([...messageArray, data]);
      window.scrollTo(
        9999,
        document.querySelector(".scrollingContainer").scrollHeight
      );
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [room1, room2]);

  const formHandler = (e) => {
    e.preventDefault();
    if (message.trim().length > 0) {
      socket.emit("private message", {
        sender: store.student.student.student.name,
        message,
        senderId: store.student.student.student._id,
        senderName: store.student.student.student.name,
        createdAt: Date.now(),
        room: room1,
      });
      setMessage("");
      let messageObj = {
        roomId: room1,
        senderName: store.student.student.student.name,
        senderId: store.student.student.student._id,
        message,
        senderRegistrationNumber:
          store.student.student.student.registrationNumber,
        receiverRegistrationNumber,
      };
      dispatch(sendMessage(room1, messageObj));
    } else {
      alert("Can't send empty message");
    }
  };

  useEffect(() => {
    socket.on("new Message", (data) => {
      console.log(data);
      new Audio(
        "https://d6cp9b00-a.akamaihd.net/downloads/ringtones/files/dl/mp3/beep-para-celular-30244.mp3"
      ).play();

      setOlderMessages(store.student.privateChat);
      setMessageArray([...messageArray, data]);
      window.scrollTo(
        9999,
        document.querySelector(".scrollingContainer").scrollHeight
      );
    });
  }, [messageArray, olderMessages]);

  return (
    <div>
      {store.student.isAuthenticated ? (
        <>
          <HomeHelper />
          <div className="container">
            <div className="row">
              <div
                className="col-md-7 rounded border p-3 mx-auto scrollingContainer"
                style={{
                  minHeight: "400px",
                  height: "500px",
                  overflowY: "auto",
                }}
              >
                {store.student?.privateChat.map((obj, index) => (
                  <div
                    key={index}
                    className={` p-2 text-light rounded-lg shadow m-1 my-2 ${
                      obj.senderId === store.student.student.student._id
                        ? "bg-secondary ml-10"
                        : "bg-dark mr-10"
                    }`}
                  >
                    <div className="text-warning">{obj.senderName}: </div>
                    <div className="smaller p-2">{obj.message}</div>
                    <div className="p-2 mb-2">
                      <small className="float-right mr-1">
                        {new Date(obj.createdAt).toLocaleTimeString()}
                      </small>
                      <small className="float-right mr-1">
                        {new Date(obj.createdAt).toDateString()}
                      </small>
                    </div>
                  </div>
                ))}
                {messageArray.map((obj, index) => (
                  <div
                    key={index}
                    className={` p-2 text-light rounded-lg shadow m-1 my-2 ${
                      obj.senderId === store.student.student.student._id
                        ? "bg-secondary ml-10"
                        : "bg-dark mr-10"
                    }`}
                  >
                    <div className="text-warning">{obj.senderName}: </div>
                    <div className="smaller p-2">{obj.message}</div>
                    <div className="p-2 mb-2">
                      <small className="float-right mr-1">
                        {new Date(obj.createdAt).toLocaleTimeString()}
                      </small>
                      <small className="float-right mr-1">
                        {new Date(obj.createdAt).toDateString()}
                      </small>
                    </div>
                  </div>
                ))}
                <form onSubmit={formHandler}>
                  <div className="form-group mt-2">
                    {/* <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type here.." type="text" className="form-control" /> */}
                    <textarea
                      className="form-control"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type here.."
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="text-right">
                    <button type="submit" className="btn btn-primary mr-1 ">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        history.push("/")
      )}
    </div>
  );
};

export default Chat;
