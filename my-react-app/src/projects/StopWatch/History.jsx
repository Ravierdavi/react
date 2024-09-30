import styles from "./styles.module.css";

function History({ isVisible, setIsVisible, historyList, setHistoryList, timerControls }) {
    const closeHistoryBox = () => {
        setIsVisible(false)
    }

    const removeHistoryItem = (i) => {
        setHistoryList(prevList => prevList.filter((_, index) => index !== i));
    }

    const applyHistoryItem = (time, dateTime) => {
        timerControls.handleStop();
        timerControls.setTime(time);
        timerControls.elapsedTimeRef.current = dateTime;
        closeHistoryBox();
    };

    return (
        isVisible &&
        <div className={styles['history-box']}>
            <div className={styles['history-box-container']}>
                <button className={styles['close-history-box']} onClick={closeHistoryBox}>x</button>
                <h1 className={styles['history-header']}>History</h1>

                <div className={styles['history-saves']}>
                    {
                        historyList.map((obj, index) => {
                            return (
                                <div className={styles['history-item']} key={index}>
                                    <h2 className={styles['history-item-title']}>{obj.name}</h2>
                                    <div className={styles['history-item-details']}>
                                        <p className={styles['history-item-time']}>{obj.time}</p>
                                        <div className={styles['history-item-buttons']}>
                                            <button className={styles['button-save']} onClick={() => {
                                                applyHistoryItem(obj.time, obj.dateTime);
                                            }}>Apply</button>
                                            <button className={styles['button-save']} onClick={() => {
                                                removeHistoryItem(index);
                                            }}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default History;