import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";

function Chat() {
  const location = useLocation();
  const { partner, isCaller } = location.state;
  const navigate = useNavigate();

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnection = useRef(null);
  const [callActive, setCallActive] = useState(true);

  useEffect(() => {
    const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
    peerConnection.current = pc;

    // Get local stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      localVideoRef.current.srcObject = stream;
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    }).catch(() => alert("Please allow camera and microphone access"));

    // Remote stream
    pc.ontrack = (event) => (remoteVideoRef.current.srcObject = event.streams[0]);

    // ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) socket.emit("ice-candidate", { to: partner.socketId, candidate: event.candidate });
    };

    // Socket handlers
    socket.on("offer", async (data) => {
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("answer", { to: data.from, answer });
    });

    socket.on("answer", async (data) => await pc.setRemoteDescription(new RTCSessionDescription(data.answer)));

    socket.on("ice-candidate", async (data) => {
      try { await pc.addIceCandidate(data.candidate); } 
      catch (err) { console.error(err); }
    });

    // Only caller creates offer
    if (isCaller) {
      const callPartner = async () => {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("offer", { to: partner.socketId, offer });
      };
      callPartner();
    }

    return () => endCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partner]);

  const endCall = () => {
    setCallActive(false);
    if (peerConnection.current) {
      peerConnection.current.getSenders().forEach((sender) => sender.track?.stop());
      peerConnection.current.close();
    }
    peerConnection.current = null;

    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    socket.off("offer");
    socket.off("answer");
    socket.off("ice-candidate");
  };

  const connectAnother = () => {
    endCall();
    navigate("/home");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Chat with {partner.username}</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        <video ref={localVideoRef} autoPlay muted style={{ width: "300px", borderRadius: "12px" }} />
        <video ref={remoteVideoRef} autoPlay style={{ width: "300px", borderRadius: "12px" }} />
      </div>

      {callActive ? (
        <button onClick={endCall} style={{ marginTop: "20px", padding: "12px 20px", background: "red", color: "white", fontSize: "1rem", borderRadius: "10px", cursor: "pointer" }}>
          End Chat
        </button>
      ) : (
        <button onClick={connectAnother} style={{ marginTop: "20px", padding: "12px 20px", background: "#667eea", color: "white", fontSize: "1rem", borderRadius: "10px", cursor: "pointer" }}>
          Connect Another
        </button>
      )}
    </div>
  );
}

export default Chat;