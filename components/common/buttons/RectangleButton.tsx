import React from 'react';
import styles from "./RectangleButton.module.scss";

const RectangleButton = ({ text, onClick, disabled, background }) => {
    return (
        <div className={`${styles["rectangle-button"]} ${background && styles["rectangle-button--background"]}`}>
            <button onClick={onClick} className={styles["rectangle-button__button"]} disabled={disabled}>
                <p className={styles["rectangle-button__text"]}>{text}</p>
            </button>
        </div>
    );
};

export { RectangleButton };