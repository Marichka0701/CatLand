import React from 'react';

import styles from './Options.module.scss';
import search from "./images/search.png";
import smile from "./images/smile.png";
import favourite from "./images/favourite.png";
import sad from "./images/sad.png";
import {useNavigate} from "react-router-dom";
import {MainRoutes} from "../../../router/MainRoutes";

const Options = () => {
    const navigate = useNavigate();
    const handleNavigateToLikesPage = () => {
        navigate(MainRoutes.LIKES);
    };

    const handleNavigateToFavouritePage = () => {
        navigate(MainRoutes.FAVOURITES);
    };

    const handleNavigateToDislikesPage = () => {
        navigate(MainRoutes.FAVOURITES);
    };

    return (
        <div className={styles.options}>
            <form className={styles.options_form} action="#">
                <div>
                    <input
                        type="text"
                        placeholder={'Search for breeds by name'}
                    />
                    <div>
                        <img src={search} alt="search icon"/>
                    </div>
                </div>
            </form>
            <div className={styles.options_operations}>
                <div
                    onClick={handleNavigateToLikesPage}
                    className={`${styles.options_operations_smile} ${styles.options_operations_standard}`}>
                    <img src={smile} alt="smile icon"/>
                </div>

                <div
                    onClick={handleNavigateToFavouritePage}
                    className={`${styles.options_operations_favourite} ${styles.options_operations_standard}`}>
                    <img src={favourite} alt="favourite icon"/>
                </div>

                <div
                    onClick={handleNavigateToDislikesPage}
                    className={`${styles.options_operations_sad} ${styles.options_operations_standard}`}>
                    <img src={sad} alt="sad icon"/>
                </div>
            </div>
        </div>

    );
};

export default Options;