import { useEffect, useMemo, useRef, useState } from 'react';
import Wheel from './wheel';
import styles from './App.module.css';
import { db } from './firestore';
import { collection, onSnapshot, query } from "firebase/firestore";
import Spider from './spider';
import { wheelSize } from './consts';
import chunk from 'lodash.chunk';

const defaultData = Array.from({ length: 250 }).map((_, index) => ({ option: `účastník č. ${index}` }));

function App({ data = defaultData, stopWatching }) {
  const chunked = useMemo(() => chunk(data, wheelSize), [data]);
  const [currentRound, setCurrentRound] = useState(0);
  const [gratulations, setGratulations] = useState(false);

  const winners = useMemo(() =>
    chunked.map((chunk) => Math.floor(Math.random() * chunk.length)),
    [chunked]
  );

  const winnersOfWinners = useMemo(() => {
    if (winners.length < 3) return [];
    const arr = [];
    while (arr.length !== 2) {
      const randIndex = Math.floor(Math.random() * winners.length);
      if (!arr.includes(randIndex)) arr.push(randIndex);
    }
    return arr;
  }, [winners]);

  const winnersData = useMemo(() =>
    winners.map((winner, index) => chunked[index][winner]),
    [chunked, winners]
  );

  const winnersRound = currentRound - chunked.length;
  const isLastRound = winnersRound >= 0;

  if (gratulations) {
    return <div className={styles.gratulations}>
      <p>Gratulujeme!! Na podium příjdou:</p>
      <p>{winnersData[winnersOfWinners[0]]?.option}</p>
      <p>{winnersData[winnersOfWinners[1]]?.option}</p>
    </div>
  }

  return (
    <div className={styles.pageWrapper}>
      <Wheel
        nextRound={() => {
          stopWatching();
          if (winnersRound === 1) setGratulations(true);
          else setCurrentRound(prev => prev + 1)
        }}
        data={isLastRound ? winnersData : chunked[currentRound]}
        winnerIndex={isLastRound ? winnersOfWinners[winnersRound] : winners[currentRound]}
      />
      <Spider
        data={chunked}
        winners={winners}
        firstWinner={winnersData[winnersOfWinners[0]]?.option}
        currentRound={currentRound}
        lastRoundIndex={winnersRound}
      />
    </div>
  );
}

const Hoc = () => {
  const [data, setData] = useState([]);
  const listener = useRef();

  useEffect(() => {
    listener.current = onSnapshot(query(collection(db, "users")), (querySnapshot) => setData(oldData => {
      if (oldData.length === querySnapshot.docs.length) return oldData;
      return querySnapshot.docs.slice(0, 625).map(d => ({ option: d.data().name }));
    }));

    return () => {
      listener.current?.();
      listener.current = undefined;
    }
  }, []);

  if (!data.length) return null;

  return <App data={data} stopWatching={() => {
    listener.current?.();
    listener.current = undefined;
  }} />
};

// export default App;
export default Hoc;
