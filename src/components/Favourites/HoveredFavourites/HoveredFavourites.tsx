import React, {FC} from 'react';

import styles from './HoveredFavourites.module.scss';
import fullRedFavIcon from '../../../constants/images/fullRedFavIcon.png';

const HoveredFavourites:FC = () => {
    return (
        <div className={styles.hoveredFavourites}>
            <div>
                <img src={fullRedFavIcon} alt="full red heart icon"/>
            </div>
        </div>
    );
};

export default HoveredFavourites;