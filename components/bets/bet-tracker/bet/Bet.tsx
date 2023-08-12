import React, {useState} from 'react';
import styles from "../BetTracker.module.scss";
import { BetGame } from "./game/BetGame";
import {getIcon} from "../../../../utils/icon";
import {SquareButton} from "../../../common/buttons/SquareButton";

const Bet = ({ bet, betIndex, editGoal , editPrice, editName, changeResult }) => {

    const betStatus = bet.games.every(game => game.status === 'winning') ? 'winning' : 'losing';

    const [isEditingName, setIsEditingName] = useState(false)
    const [isEditingPrice, setIsEditingPrice] = useState(false)

    const onInputClick = (type) => {
        if (type === 'name' && !isEditingName) {
            alert(bet.name)
            setIsEditingName(true)
        } else if (type === 'name' && !isEditingPrice) {
            setIsEditingPrice(true)
        }
    }

    return (
        <div className={styles["bet"]} key={betIndex + '-bet'}>
            {isEditingName ?
                <div>
                    <input disabled={!isEditingName} onClick={() => onInputClick('name')} name={'bet-' + betIndex + '-name'} className={styles["bet__name"]} type="text" value={bet.name} onChange={(value) => editName(betIndex, value)} />
                    <SquareButton type={'save'} onClick={() => setIsEditingName(false)}/>
                </div>
                : <h2 className={styles["bet__name"]} onClick={() => setIsEditingName(true)}>{bet.name ?? ''}</h2>}
            {isEditingPrice ?
                <div>
                    <input onClick={() => onInputClick('price')}  name={'bet-' + betIndex + '-price'} className={styles["bet__price"]} type="text" value={bet.price} onChange={(e) => editPrice(betIndex, e)}/>
                    <SquareButton type={'save'} onClick={() => setIsEditingPrice(false)}/>
                </div>
                :
                <p className={styles["bet__price"]} onClick={() => setIsEditingPrice(true)}>£{bet.price}</p>}
            {bet.games.map((game, gameIndex) => {
                return <BetGame game={game} gameIndex={gameIndex} betIndex={betIndex} editGoal={editGoal} changeResult={(gameIndex, result) => changeResult(betIndex, gameIndex, result)} />
            })}
            <div className={styles["bet__status-container"]}>
                <div className={styles["bet__status"]} >{getIcon(betStatus)}</div>
            </div>
        </div>
    );
};

export { Bet };
