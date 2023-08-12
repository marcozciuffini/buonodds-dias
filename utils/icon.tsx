import styles from "../components/bets/bet-tracker/BetTracker.module.scss";
import {AiFillCheckSquare, AiFillCloseSquare, AiOutlineCheckCircle, AiOutlineCloseCircle} from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

export const getIcon = (icon, color?) => {
    switch (icon) {
        case 'winning':
            return (
                <div className={`${styles['bet__icon']} ${styles['bet__winning-icon']}`} style={{ backgroundColor: 'green' }}>
                    <AiFillCheckSquare color={color}/>
                </div>
            );
        case 'losing':
            return (
                <div className={`${styles['bet__icon']} ${styles['bet__losing-icon']}`} style={{ backgroundColor: 'red' }}>
                    <AiFillCloseSquare color={color} />
                </div>
            );
        case 'edit':
            return <FiEdit color={color} />;
        case 'stop-edit':
            return <AiOutlineCloseCircle color={color} />;
        case 'save':
            return <AiOutlineCheckCircle color={color} />;
        case 'finish':
            return <AiOutlineCheckCircle color={color} />;
        case 'cancel':
            return <AiOutlineCloseCircle color={color} />;
        default:
            return (
                <div className={styles['bet__icon']}>
                    <AiFillCloseSquare color={color} />
                </div>
            );
    }
}