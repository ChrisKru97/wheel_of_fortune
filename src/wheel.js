import styles from './wheel.module.css';
import { Wheel } from 'react-custom-roulette'
import { useState } from 'react';

const WheelWrapper = ({ data, winnerIndex, nextRound }) => {
    const [spinning, setSpinning] = useState();
    const handleSpin = () => {
        setSpinning(true)
    };

    return <div className={styles.pageWrapper}>
        <Wheel
            radiusLineWidth={1}
            outerBorderWidth={2}
            spinDuration={0.7}
            onStopSpinning={() => {
                setSpinning(false);
                nextRound();
            }}
            prizeNumber={winnerIndex}
            mustStartSpinning={spinning}
            data={data}
        />
        <button className={styles.spinButton} onClick={handleSpin}>Roztočit</button>
    </div>
}

export default WheelWrapper
