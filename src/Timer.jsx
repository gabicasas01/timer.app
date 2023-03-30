import React, {useState, useEffect} from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Settings from './Settings'


const Timer = () => {
  const [settingState, setSettingState] = useState(false);
  const [seconds, setSeconds] = useState(25);
  const [initialSeconds, setInitialSeconds] = useState(25);
  const [isActive, setIsActive] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [laps, setLaps] = useState(0)

  useEffect(() => {
    let intervalId;

    if (isActive && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    if (seconds === 0 && repeat) {
      setSeconds(initialSeconds)
      setLaps(laps + 1)
    }

    return () => clearInterval(intervalId);
  }, [isActive, seconds]);

  const onCloseSetting = () => {
    setSettingState(!settingState)
  }

  const handleRepeat = (r) => {
    setRepeat(r)
  }

  const handleSeconds = (s) => {
    setSeconds(s)
    setInitialSeconds(s)
  }

  return (
    <>
      {!settingState ? (
        <div className="flex flex-col items-center justify-center h-screen bg-[#0A192F]">
            <div className="flex flex-col items-center justify-center">
              <CircularProgressbar
                value={seconds}
                maxValue={initialSeconds}
                text={`${seconds}`}
                strokeWidth={5}
                styles={{
                  root: { width: 300 },
                  path: { stroke: "#04817d", strokeLinecap: "butt" },
                  text: {
                    fontSize: "50px",
                    fill: "#04817d",
                    fontWeight: "bold",
                  },
                }}
              />
              {repeat ? (
                <p className="mt-4 text-lg text-gray-100">Vueltas: {laps}</p>
              ) : null}
            </div>
          <div className="flex mt-8">
            <button
              className={`w-24 px-4 py-2 rounded-full ${
                isActive ? "bg-[#4872ad]" : "bg-[#255DAE]"
              } text-white font-medium mx-4 focus:outline-none`}
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? "Pause" : "Play"}
            </button>
            <button
              className="w-24 px-4 py-2 bg-[#BF2240] text-white font-medium rounded-full focus:outline-none"
              onClick={() => {
                setIsActive(false);
                setSeconds(initialSeconds);
                setLaps(0);
              }}
            >
              Reset
            </button>
          </div>
          <button
            className="w-36 bg-gray-700  px-4 py-2 text-white font-medium rounded-full focus:outline-none absolute bottom-40 left-1/2 transform -translate-x-1/2"
              onClick={onCloseSetting}
            >
              Opciones
            </button>
        </div>
      ) :
      <Settings setTime={handleSeconds} onClose={onCloseSetting} setRepeat={handleRepeat} />
    }
    </>
  );
};

export default Timer;
