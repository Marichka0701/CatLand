import React, {FC, PropsWithChildren} from 'react';

import styles from './HistoryContainer.module.scss';
import {IResVote} from "../../../interfaces/IResVote";
import HistoryItem from "./HistoryItem/HistoryItem";

interface IProps extends PropsWithChildren {
    history: IResVote[]
}

const HistoryContainer:FC<IProps> = ({history}) => {
    return (
        <div className={styles.historyContainer}>
            {
                history.map((item, index) => <HistoryItem item={item} key={index}/>)
            }
        </div>
    );
};

export default HistoryContainer;