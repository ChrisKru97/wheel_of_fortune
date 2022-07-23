import styles from './spider.module.css';
import TournamentBracket from "react-svg-tournament-bracket";

const Spider = ({ data, winners, firstWinner, currentRound, lastRoundIndex }) => {
    return <div className={styles.pageWrapper}>
        <TournamentBracket
            backgroundColor="#c7ffba"
            height={window.innerHeight}
            width={window.innerWidth * 0.7}
            disableStrictBracketSizing
            highlightColor={{
                backgroundColor: "rgb(66, 90, 156)"
            }}
            matches={[
                ...data.map((chunk, i) => ({
                    homeTeamName: currentRound > i ? chunk[winners[i]].option : chunk[0].option,
                    awayTeamName: currentRound > i ? " " : chunk.at(-1).option,
                    round: 1,
                    matchNumber: i + 1,
                    highlight: currentRound === i ? "match" : currentRound > i ? "home" : undefined
                })),
                {
                    homeTeamName: lastRoundIndex === 1 ? firstWinner : currentRound > 0 ? data[0][winners[0]].option : "neznámý",
                    awayTeamName: lastRoundIndex === 1 ? " " : !lastRoundIndex ? data.at(-1)[winners.at(-1)].option : "neznámý",
                    round: 2,
                    matchNumber: data.length + 1,
                    highlight: !lastRoundIndex ? "match" : lastRoundIndex === 1 ? "home" : undefined
                },
            ]}
        />
    </div>
}

export default Spider;