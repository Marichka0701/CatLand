import React, {FC} from 'react';

import styles from './MainLayout.module.scss';
import Header from "../../components/Header/Header";
import LeftSide from "../../components/LeftSide/LeftSide";
import {Outlet} from "react-router-dom";
import {useAppSelector} from "../../hooks/reduxHooks";

const MainLayout:FC = () => {
    const {modalIsOpen} = useAppSelector(state => state.UI);

    return (
        <div className={`${styles.mainLayout} ${modalIsOpen ? styles.modalIsOpen : ''}`}>
            <div className={`${styles.mainLayout_leftSide} ${modalIsOpen ? styles.modalIsOpen : ''}`}>
                <Header/>
                <LeftSide/>
            </div>
            <Outlet/>
        </div>
    );
};

export default MainLayout;