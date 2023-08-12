import {useEffect, useState} from "react";
import styles from './BetTracker.module.scss';
import betGameStyles from './bet/game/BetGame.module.scss';
import { Bet } from "./bet/Bet";
import {RectangleButton} from "../../common/buttons/RectangleButton";

const resultStrings = {
    homeWin: 'Home Win',
    awayWin: 'Away Win',
    draw: 'Draw',
    btts: 'Both Teams To Score'
}

const date = new Date();

export const BetTracker: React.FC = props => {

    const [bets, setBets] = useState([]);
    const [addNewBet, setAddNewBet] = useState(false);

   useEffect(() => {
       if (typeof window !== 'undefined') {
          const storedBets = localStorage.getItem(date.getDate());
          if (storedBets) {
           setBets(JSON.parse(storedBets));
          }
       }
   }, [])

    const [newBet, setNewBet] = useState( {
        name: null,
        price: null,
        games: []
    });
    const [newHomeTeam, setNewHomeTeam] = useState('');
    const [newAwayTeam, setNewAwayTeam] = useState('');

    const editNewBet = (value, key) => {
        if (key === 'result') {
            setNewBet(prevState => ({
                ...prevState,
                games: [
                    ...prevState.games,
                    {
                        homeTeam: newHomeTeam,
                        homeTeamGoals: 0,
                        awayTeam: newAwayTeam,
                        awayTeamGoals: 0,
                        resultWanted: value,
                        status: 'losing'
                    }
                ]
            }))
        setNewHomeTeam('')
        setNewAwayTeam('')
        } else {
            setNewBet(prevState => ({
                ...prevState,
                [key]: value,
            }))
        }
    }

    const scrapBet = () => {
        setNewBet({
            name: null,
            price: null,
            games: []
        });
        setNewHomeTeam('')
        setNewAwayTeam('')
        setAddNewBet(false)
    }

    const addBet = () => {
        const updatedBets = [...bets, newBet]
        setBets(updatedBets)
        setNewBet({
            name: null,
            price: null,
            games: []
        });
        if (typeof window !== 'undefined') {
            localStorage.setItem(date.getDate(), JSON.stringify(updatedBets));
        }
    }

    const updateBet = async (betIndex, betToEdit) => {
        const updatedBet = bets.map((bet, index) => {
            if (index === betIndex) {
                return betToEdit;
            } else {
                return bet
            }
        })
        setBets(updatedBet);
        if (typeof window !== 'undefined') {
            await localStorage.setItem(date.getDate(), JSON.stringify(updatedBet));
        }
        return true;
    }

    const checkGameStatus = (gameToEdit) => {
        if (gameToEdit.resultWanted === 'homeWin') {
            if (gameToEdit.homeTeamGoals > gameToEdit.awayTeamGoals) {
                gameToEdit.status = 'winning'
            } else if (gameToEdit.status === 'winning') {
                gameToEdit.status = 'losing'
            }
        } else if (gameToEdit.resultWanted === 'awayWin') {
            if (gameToEdit.awayTeamGoals > gameToEdit.homeTeamGoals) {
                gameToEdit.status = 'winning'
            } else if (gameToEdit.status === 'winning') {
                gameToEdit.status = 'losing'
            }
        } else if (gameToEdit.resultWanted === 'draw') {
            if (gameToEdit.awayTeamGoals === gameToEdit.homeTeamGoals) {
                gameToEdit.status = 'winning'
            } else if (gameToEdit.status === 'winning') {
                gameToEdit.status = 'losing'
            }
        } else if (gameToEdit.resultWanted === 'btts') {
            if (gameToEdit.awayTeamGoals > 0 && gameToEdit.homeTeamGoals > 0) {
                gameToEdit.status = 'winning'
            } else if (gameToEdit.status === 'winning') {
                gameToEdit.status = 'losing'
            }
        }
    }


    const editGoal = async (direction = 'add', betIndex, gameIndex, team) => {
        const betToEdit = bets[betIndex];
        const gameToEdit = betToEdit.games[gameIndex];
        if (direction === 'remove') {
            gameToEdit[team + 'TeamGoals'] -= 1
        } else {
            gameToEdit[team + 'TeamGoals'] += 1
        }

        await checkGameStatus(gameToEdit);
        updateBet(betIndex, betToEdit)
    }

    const editName = (betIndex, e) => {
        const name = e.target.value;
        const betToEdit = bets[betIndex];
        betToEdit.name = name;
        updateBet(betIndex, betToEdit)
    }

    const editPrice = (betIndex, e) => {
        const price = e.target.value;
        const betToEdit = bets[betIndex];
        betToEdit.price = price;
        updateBet(betIndex, betToEdit)
    }

    const changeResult = async (betIndex, gameIndex, result) => {
        const betToEdit = bets[betIndex];
        const gameToEdit = betToEdit.games[gameIndex];
        gameToEdit.resultWanted = result;

        await updateBet(betIndex, betToEdit)
        await checkGameStatus(gameToEdit);

        return true;
    }

    return (
        <div className={styles["bet-tracker"]}>
            {addNewBet &&
            <div className={`${styles["bet"]} ${styles["bet__add-bet"]}`}>
                <div className={styles["bet__info"]}>
                    <label className={styles["bet__info-entry"]}>
                        Name
                        <input type='text' className={`${styles["bet__input"]} ${styles["bet__input-name"]}`} value={newBet.name} onChange={(e) => editNewBet(e.target.value, 'name')} required />
                    </label>
                </div>
                <div className={styles["bet__info"]}>
                    <label className={styles["bet__info-entry"]}>
                        Price
                        <div className={styles["bet__price"]}>
                            <p>£</p>
                            <input type="number" min="0.00" step="0.01" className={styles["bet__input"]} value={newBet.price} onChange={(e) => editNewBet(e.target.value, 'price')} required />
                        </div>
                    </label>
                </div>

                {newBet.games && newBet.games.map((game, index) =>
                    <div className={betGameStyles["game"]} key={index}>
                        <p className={`${betGameStyles["game__team"]} ${betGameStyles["game__home-team"]} ${game.resultWanted === 'homeWin' && styles["bet__winning-team"]}`}>{game.homeTeam}</p>
                        <p className={betGameStyles["game__x"]}>x</p>
                        <p className={`${betGameStyles["game__team"]} ${betGameStyles["game__away-team"]} ${game.resultWanted === 'awayWin' && styles['bet__winning-team']}`}>{game.awayTeam}</p>
                        <p className={betGameStyles["game__result"]}>{resultStrings[game.resultWanted]}</p>
                    </div>
                )}
                <div className={[styles["bet__add-game"]]}>
                <div className={[styles["bet__buttons"]]}>
                    <RectangleButton onClick={() => editNewBet('homeWin', 'result')} text={'HOME WIN'}/>
                    <RectangleButton onClick={() => editNewBet('draw', 'result')} text={'DRAW'} />
                    <RectangleButton onClick={() => editNewBet('awayWin', 'result')} text={'AWAY WIN'} />
                    <RectangleButton  onClick={() => editNewBet('btts', 'result')} text={'BTTS'} />
                </div>
                <div className={[styles["bet__game-inputs"]]}>
                    <input type='text' className="bet__team bet__home-team" value={newHomeTeam} onChange={(e) => setNewHomeTeam(e.target.value)} required />
                    <p className={[styles["bet__game-inputs-x"]]}>x</p>
                    <input type='text' className="bet__team bet__away-team" value={newAwayTeam}  onChange={(e) => setNewAwayTeam(e.target.value)} required/>
                </div>
                <div className={styles["bet__buttons"]}>
                    <RectangleButton onClick={() => addBet()} disabled={newBet.games.length === 0} text={'SAVE'} />
                    <RectangleButton onClick={() => scrapBet()} text={'SCRAP'} />
                </div>
                </div>
            </div>
            }
            <div className={styles["bet__add-button"]}>
                <RectangleButton onClick={() => setAddNewBet(true)} text={"Add Bet"} background/>
            </div>

            <div className={styles["bets"]}>
                {bets.map((bet, betIndex) => {
                    return <Bet
                        bet={bet}
                        betIndex={betIndex}
                        editName={editName}
                        editPrice={editPrice}
                        editGoal={editGoal}
                        changeResult={changeResult}
                    />
                })}
            </div>


        </div>
    );
};