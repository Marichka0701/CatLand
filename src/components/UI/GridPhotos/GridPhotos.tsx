import React, {FC, PropsWithChildren, SetStateAction, useState} from 'react';

import styles from './GridPhotos.module.scss';
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import HoveredPhotos from "../HoveredPhotos/HoveredPhotos";
import {useNavigate} from "react-router-dom";
import {IImages} from "../../../interfaces/IImages";
import {MainRoutes} from "../../../router/MainRoutes";
import {breedsActions} from "../../../redux/slices/breedsSlice";

interface IProps extends PropsWithChildren {
    limit: number,
}

const GridPhotos: FC<IProps> = ({limit}) => {
    const classnames = [
        'one', 'two', 'three', 'four', 'five',
        'six', 'seven', 'eight', 'nine', 'ten',
        'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
        'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'
    ];

    const [hoveredItem, setHoveredItem] = useState<SetStateAction<number>>(null);

    const {images} = useAppSelector(store => store.images);
    const {selected_breeds} = useAppSelector(store => store.breeds);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleMouseEnter = (index: number) => {
        setHoveredItem(index);
    }

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const handleNavigate = async (item: IImages) => {
        await dispatch(breedsActions.setSelectedBreeds(item));
        const id = item?.breeds[0]?.id;
        navigate(`/breeds/${id}`);
    };

    return (
        <>
            {
                limit === 5 ?
                    <div className={styles.gridFive}>
                        {
                            images &&
                            classnames.slice(0, limit).map((item, index) => {
                                return <div
                                    className={`${styles[`gridFive_${item}`]} ${styles.gridFive_item}`}
                                    key={index}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleNavigate(images[index])}
                                >
                                    <img src={images[index]?.url} alt="cat`s photo"/>
                                    {
                                        hoveredItem === index &&
                                        <HoveredPhotos name={images[index]?.breeds[0]?.name}/>
                                    }
                                </div>
                            })
                        }
                    </div> :
                    limit === 10 ?
                        <div className={styles.gridTen}>
                            {
                                images &&
                                classnames.slice(0, limit).map((item, index) => {
                                    return <div
                                        className={`${styles[`gridTen_${item}`]} ${styles.gridTen_item}`}
                                        key={index}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleNavigate(images[index])}
                                    >
                                        <img src={images[index]?.url} alt="cat`s photo"/>
                                        {
                                            hoveredItem === index &&
                                            <HoveredPhotos name={images[index]?.breeds[0]?.name}/>
                                        }
                                    </div>
                                })
                            }
                        </div> :
                        limit === 15 ?
                            <div className={styles.gridFifteen}>
                                {
                                    images &&
                                    classnames.slice(0, limit).map((item, index) => {
                                        return <div
                                            className={`${styles[`gridFifteen_${item}`]} ${styles.gridFifteen_item}`}
                                            key={index}
                                            onMouseEnter={() => handleMouseEnter(index)}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={() => handleNavigate(images[index])}
                                        >
                                            <img src={images[index]?.url} alt="cat`s photo"/>
                                            {
                                                hoveredItem === index &&
                                                <HoveredPhotos name={images[index]?.breeds[0]?.name}/>
                                            }
                                        </div>
                                    })
                                }
                            </div> :
                            limit === 20 ?
                                <div className={styles.gridTwenty}>
                                    {
                                        images &&
                                        classnames.slice(0, limit).map((item, index) => {
                                            return <div
                                                className={`${styles[`gridTwenty_${item}`]} ${styles.gridTwenty_item}`}
                                                key={index}
                                                onMouseEnter={() => handleMouseEnter(index)}
                                                onMouseLeave={handleMouseLeave}
                                                onClick={() => handleNavigate(images[index])}
                                            >
                                                <img src={images[index]?.url} alt="cat`s photo"/>
                                                {
                                                    hoveredItem === index &&
                                                    <HoveredPhotos name={images[index]?.breeds[0]?.name}/>
                                                }
                                            </div>
                                        })
                                    }
                                </div> : null

            }
        </>);
};

export default GridPhotos;