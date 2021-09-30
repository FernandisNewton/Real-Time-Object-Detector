import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawBox } from "./DrawBox";
import LoadingAnimation from "./components/LoadingAnimation";
import "./App.css";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const runCoco = async () => {
    const net = await cocossd.load();

    setInterval(() => {
      detectObjects(net);
    }, 100);
  };

  const detectObjects = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);
      if (obj) setLoading(false);

      const ctx = canvasRef.current.getContext("2d");
      drawBox(obj, ctx);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className="App">
      <h1>Real-Time Object detection</h1>
      {loading ? <LoadingAnimation /> : <></>}

      <div className="container">
        <Webcam
          ref={webcamRef}
          muted={true}
          videoConstraints={{
            width: 1920,
            height: 1080,
          }}
          style={{
            position: "absolute",
            textAlign: "center",
            zindex: 9,
            height: "80vh",
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            textAlign: "center",
            zindex: 8,
            height: "80vh",
          }}
        />
      </div>
    </div>
  );
}

export default App;
