import React, {useState} from 'react';
import {getIcon} from "../../../../../utils/icon";
import {SquareButton} from "../../../../common/buttons/SquareButton";
import styles from './BetGame.module.scss';
import {BetGoals} from "./goals/BetGoals";


const BetGame = ({ game, gameIndex, betIndex, editGoal, changeResult}) => {

    const [isEditing, setIsEditing] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    const changeGameResult = (result) => {
        changeResult(gameIndex, result).then((response) => setIsEditing(!response));
    }

    return (
        <div className={`${styles["game"]} ${isFinished && styles["game__finished"]}`} key={'game-' + gameIndex}>
            {isEditing && <div className={styles["game__status"]} >{getIcon(game.status)}</div>}
            {!isEditing && <div className={styles["game__status"]} >{getIcon(game.status)}</div>}
            <p className={`${styles["game__team"]} ${styles["game__home-team"]} ${game.resultWanted === 'homeWin' && styles['game__winning-team']}`}>{game.homeTeam}</p>
            {isEditing ?
                <button onClick={() => changeGameResult('homeWin')}>Home Win</button>
                :
                <BetGoals goals={game.homeTeamGoals}
                       editGoal={(addOrRemove) => editGoal(addOrRemove, betIndex, gameIndex, 'home')}
                       disabled={isFinished}/>
            }
            {isEditing ?
                <button onClick={() => changeGameResult('draw')}>Draw </button>
                :
                <p className={styles["game__x"]}>x</p>
            }
            {isEditing ?
                <button onClick={() => changeGameResult('awayWin')}>Away Win</button>
                :
                <BetGoals goals={game.awayTeamGoals}
                            editGoal={(addOrRemove) => editGoal(addOrRemove, betIndex, gameIndex, 'away')}
                            disabled={isFinished}/>
            }
            <p className={`${styles["game__team"]} ${styles["game__away-team"]} ${game.resultWanted === 'awayWin' && styles['game__winning-team']}`}>{game.awayTeam}</p>
            {isFinished && <div className={styles["game__status"]} >{getIcon(game.status)}</div>}
            {!isFinished && <SquareButton type={isEditing ? 'stop-edit' : 'edit'} onClick={() => setIsEditing(!isEditing)}/>}
            <SquareButton type={isFinished ? 'cancel' : isEditing ? 'save' : 'finish'} onClick={() => setIsFinished(!isFinished)}/>
        </div>
    );
};

export { BetGame };
