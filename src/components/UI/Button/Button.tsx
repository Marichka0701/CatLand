import React, {FC, PropsWithChildren} from 'react';

import styles from './Button.module.scss';

interface IProps extends PropsWithChildren {
    name: string,
}

const Button:FC<IProps> = ({name}) => {
    return (
        <button className={styles.button}>
            {name}
        </button>
    );
};

export default Button;