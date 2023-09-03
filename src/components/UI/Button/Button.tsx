import React, {FC, PropsWithChildren} from 'react';

import styles from './Button.module.scss';
import {useLocation, useNavigate, useParams} from "react-router-dom";

interface IProps extends PropsWithChildren {
    name: string,
}

const Button:FC<IProps> = ({name}) => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const handleNavigate = () => {
        navigate(name);
    };

    const currentPath = pathname.split('/')[1];

    return (
        <button
            onClick={handleNavigate}
            className={`${styles.button} ${currentPath === name ? styles.active : ''}`}
        >
            {name}
        </button>
    );
};

export default Button;