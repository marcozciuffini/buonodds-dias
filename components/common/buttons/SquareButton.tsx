import React from 'react';
import { getIcon } from "../../../utils/icon";
import styles from "./SquareButton.module.scss";

const heading = {
    'edit': 'Edit',
    'stop-edit': 'Cancel',
    'save': 'Save',
    'finish': 'Finished',
    'cancel': 'Cancel',
}

const SquareButton = ({ type, onClick }) => {
    return (
        <div className={styles["square-button"]}>
            <button onClick={onClick} className={styles["square-button__button"]}>
                <p className={styles["square-button__text"]}>{heading[type]}</p>
                {getIcon(type, 'white')}
            </button>
        </div>
    );
};

export { SquareButton };
