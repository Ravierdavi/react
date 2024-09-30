import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import History from "./History";

function StopWatch() {
    const [time, setTime] = useState("00:00:00");
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null); // Referência para o intervalo
    const elapsedTimeRef = useRef(0); // Armazena o tempo decorrido

    // Ref para o ponteiro
    const clockHand = useRef();

    // StopWatch Logic
    useEffect(() => {
        if (isRunning) {
            const initialTime = Date.now() - elapsedTimeRef.current;
            intervalRef.current = setInterval(() => {
                elapsedTimeRef.current = Date.now() - (initialTime);
                const totalSeconds = Math.floor(elapsedTimeRef.current / 1000);
                const s = totalSeconds % 60;
                const m = Math.floor((totalSeconds % 3600) / 60);
                const h = Math.floor(totalSeconds / 3600);
                clockHand.current.style.rotate = `${s * 6}deg`;

                const currentTime = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
                setTime(currentTime);
            }, 1000);
        } else {
            clearInterval(intervalRef.current); // Limpa o intervalo
            intervalRef.current = null; // Remove a referência ao intervalo
        }
        
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        handleStop(); // Para o cronômetro
        setTime("00:00:00"); // Redefine o tempo
        elapsedTimeRef.current = 0; // Zera o tempo decorrido
        clockHand.current.style.rotate = "0deg"; // Volta o ponteiro para a posição inicial
    };

    // History Logic
    const [isHistoryBoxVisible, setIsHistoryBoxVisible] = useState(false);
    const inpHistoryRef = useRef();
    const [saves, setSaves] = useState([]);

    const openHistoryBox = () => {
        setIsHistoryBoxVisible(true);
    }

    const saveTime = () => {
        const saveName = inpHistoryRef.current.value.trim();
        if (saveName !== "") {
            inpHistoryRef.current.value = "";
            setSaves((prevList) => [...prevList, { name: saveName, time: time, dateTime: elapsedTimeRef.current }]);
        }
    };

    return (
        <>
            <div className={styles['stopwatch-app']}>
                <section className={styles['clock-wrapper']}>
                    <div className={styles.clock}>
                        <div ref={clockHand} className={styles['clock-hand-second']}></div>
                    </div>
                    <div className={styles['time-display']}>
                        <p>{time}</p>
                    </div>
                </section>

                <section className={styles['history-container']}>
                    <button className={styles['save-time-button']} onClick={saveTime}>Save Time</button>
                    <input className={styles['history-input']} ref={inpHistoryRef} type="text" placeholder="type your time name" />
                    <div className={styles['history-toggle-button']} onClick={openHistoryBox}>
                        <i className="fa-solid fa-history"></i>
                    </div>
                </section>

                <section className={styles['controls-container']}>
                    <button className="startBtn" onClick={handleStart}>Start</button>
                    <button className="stopBtn" onClick={handleStop}>Stop</button>
                    <button className="resetBtn" onClick={handleReset}>Reset</button>
                </section>
            </div>

            <History isVisible={isHistoryBoxVisible} setIsVisible={setIsHistoryBoxVisible} historyList={saves} setHistoryList={setSaves} timerControls={{ setTime, handleStop, elapsedTimeRef }} />

        </>
    );
}

export default StopWatch;