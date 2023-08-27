import React, {FC, PropsWithChildren} from 'react';

import styles from './ButtonPinkSecondPage.module.scss';

interface IProps extends PropsWithChildren {
    name: string,
    color: string,
    background: string,
}

const ButtonPinkSecondPage:FC<IProps> = ({name, color, background}) => {
    return (
        <button className={styles.button} style={{color: color, background: background}}>
            {name}
        </button>
    );
};

export default ButtonPinkSecondPage;