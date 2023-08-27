import React, {FC} from 'react';

import styles from './Loader.module.scss';

const Loader: FC = () => {
    return (
        <div className={styles.holder}>
            <div className={styles.preloader}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export {Loader};