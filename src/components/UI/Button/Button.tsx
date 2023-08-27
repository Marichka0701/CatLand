import React, {FC, PropsWithChildren} from 'react';

import styles from './Button.module.scss';
import {useNavigate} from "react-router-dom";

interface IProps extends PropsWithChildren {
    name: string,
}

const Button:FC<IProps> = ({name}) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(name);
    };

    return (
        <button
            onClick={handleNavigate}
            className={styles.button}
        >
            {name}
        </button>
    );
};

export default Button;