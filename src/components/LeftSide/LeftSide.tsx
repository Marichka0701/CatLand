import React, {FC} from 'react';

import styles from "./LeftSide.module.scss";
import voting from "./images/voting.png";
import Button from "../UI/Button/Button";
import breeds from "./images/breeds.png";
import gallery from "./images/gallery.png";
import {useAppSelector} from "../../hooks/reduxHooks";

const LeftSide:FC = () => {
    const {modalIsOpen} = useAppSelector(state => state.UI);

    return (
        <div className={`${styles.leftSide} ${modalIsOpen ? styles.modalIsOpen : ''}`}>
            <div className={styles.leftSide_titles}>
                <h1>Hi!👋</h1>
                <p>Welcome to CatLand🐾</p>
            </div>

            <div className={styles.leftSide_options}>
                <div className={styles.leftSide_options_option}>
                    <div className={`${styles.leftSide_options_option_voting} ${styles.leftSide_options_option_standard}`}>
                        <img src={voting} alt="voting logo"/>
                    </div>
                    <Button name={'voting'}/>
                </div>

                <div className={styles.leftSide_options_option}>
                    <div className={`${styles.leftSide_options_option_breeds} ${styles.leftSide_options_option_standard}`}>
                        <img src={breeds} alt="breeds logo"/>
                    </div>
                    <Button name={'breeds'}/>
                </div>

                <div className={styles.leftSide_options_option}>
                    <div className={`${styles.leftSide_options_option_gallery} ${styles.leftSide_options_option_standard}`}>
                        <img src={gallery} alt="gallery logo"/>
                    </div>
                    <Button name={'gallery'}/>
                </div>
            </div>
        </div>
    );
};

export default LeftSide;