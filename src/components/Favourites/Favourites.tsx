import React, {FC, useEffect, useState} from 'react';

import styles from './Favourites.module.scss';
import Options from "../UI/Options/Options";
import BackButton from "../UI/BackButton/BackButton";
import ButtonPinkSecondPage from "../UI/ButtonPinkSecondPage/ButtonPinkSecondPage";
import {favouriteActions} from "../../redux/slices/favouritesSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {Loader} from "../UI/Loader/Loader";
import {Pagination} from "@mui/material";
import HoveredFavourites from "./HoveredFavourites/HoveredFavourites";
import {IResMoreInfoVote} from "../../interfaces/IResMoreInfoVote";

const Favourites:FC = () => {
    const dispatch = useAppDispatch();
    const {favouritePhotos, loading} = useAppSelector(state => state.favourite);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hoveredItem, setHoveredItem] = useState<number>(null);

    useEffect(() => {
        const getData = async () => {
            dispatch(await favouriteActions.getAll());
        }
        getData();
    }, []);

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentPage(newPage);
    };

    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleLikedPhotos = favouritePhotos.slice(startIndex, endIndex);

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    const handleMouseEnter = (index: number) => {
        setHoveredItem(index);
    };

    const handleDeleteFavouritePhoto = async (item: IResMoreInfoVote) => {
        const id = item.id;
        await dispatch(favouriteActions.deleteFavouriteById({id}));
    }

    return (
        <div className={styles.favourites}>
            <Options input_breed_name={''} />

            <div className={styles.favourites_content}>
                <div className={styles.favourites_content_functions}>
                    <BackButton link={'/'}/>
                    <ButtonPinkSecondPage name={'favourites'} color={'#FFF'} background={'#FF868E'}/>
                </div>

                {
                    loading === 'loading' ? (
                        <div className={styles.favourites_content_loaderContainer}>
                            <div className={styles.favourites_content_loaderContainer_loader}>
                                <Loader/>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.favourites_content_container}>
                            <div className={styles.favourites_content_container_photos}>
                                {visibleLikedPhotos.map((item, index) => (
                                    <div
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => handleDeleteFavouritePhoto(item)}
                                    >
                                        <img
                                            className={styles.favourites_content_container_photos_item}
                                            key={index}
                                            src={item.image.url}
                                            alt={`photo ${item.image_id}`}
                                        />
                                        {hoveredItem === index && <HoveredFavourites/>}
                                    </div>
                                ))}
                            </div>
                            <Pagination
                                count={Math.ceil(favouritePhotos.length / itemsPerPage)}
                                variant="outlined"
                                shape="rounded"
                                page={currentPage}
                                onChange={handleChangePage}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Favourites;