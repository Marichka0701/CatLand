import React, {FC, PropsWithChildren} from 'react';

import styles from './BackButton.module.scss';
import arrow from '../../../constants/images/back.png';
import {useNavigate} from "react-router-dom";

interface IProps extends PropsWithChildren {
    link: string,
}
const BackButton:FC<IProps> = ({link}) => {
    const navigate = useNavigate();
    const handleBackNavigate = () => {
        navigate(link);
    };

    return (
        <button
            onClick={handleBackNavigate}
            className={styles.backButton}
        >
            <img src={arrow} alt="arrow back icon"/>
        </button>
    );
};

export default BackButton;