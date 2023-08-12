import React from 'react';
import styles from "./BetGoals.module.scss";

const BetGoals = ({ goals, editGoal, disabled }) => {
    return (
        <div className={styles["goals"]}>
            <button
                className={`${styles["goals__button"]} ${styles["goals__add"]}`}
                onClick={() => editGoal('add')}
                disabled={disabled}
            >
                +
            </button>
            <p className={`${styles["goals__goals"]}`}>{goals}</p>
            <button
                className={`${styles["goals__button"]} ${styles["goal__minus"]}`}
                onClick={() => editGoal('remove')}
                disabled={goals === 0 || disabled}>
                -
            </button>
        </div>
    );
};

export { BetGoals };
