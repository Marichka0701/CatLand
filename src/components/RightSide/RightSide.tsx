import React, {FC} from 'react';

import styles from './RightSide.module.scss';
import girl from './images/girl.png';

const RightSide:FC = () => {
    return (
        <div className={styles.rightSide}>
            <img src={girl} alt="girl and pets"/>
        </div>
    );
};

export default RightSide;