import React, {FC, PropsWithChildren} from 'react';

import styles from './HoveredPhotos.module.scss';

interface IProps extends PropsWithChildren {
    name: string,
}

const HoveredPhotos:FC<IProps> = ({name}) => {
    return (
        <div className={styles.hovered}>
            <div className={styles.hovered_info}>
                {name ? name : 'Unknown'}
            </div>
        </div>
    );
};

export default HoveredPhotos;