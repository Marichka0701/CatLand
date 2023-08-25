import React, {FC} from 'react';

import styles from './MainLayout.module.scss';
import Header from "../../components/Header/Header";
import LeftSide from "../../components/LeftSide/LeftSide";
import {Outlet} from "react-router-dom";

const MainLayout:FC = () => {
    return (
        <div className={styles.mainLayout}>
            <div className={styles.mainLayout_leftSide}>
                <Header/>
                <LeftSide/>
            </div>
            <Outlet/>
        </div>
    );
};

export default MainLayout;