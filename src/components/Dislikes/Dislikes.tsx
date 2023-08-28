import React, {useEffect, useState} from 'react';
import {Pagination} from "@mui/material";

import '../../index.css';

import styles from './Dislikes.module.scss';
import Options from "../UI/Options/Options";
import BackButton from "../UI/BackButton/BackButton";
import ButtonPinkSecondPage from "../UI/ButtonPinkSecondPage/ButtonPinkSecondPage";
import {Loader} from "../UI/Loader/Loader";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {votingActions} from "../../redux/slices/votingSlice";

const Dislikes = () => {
    const dispatch = useAppDispatch();
    const {dislikedPhotos, loading} = useAppSelector(state => state.voting);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(votingActions.getMoreInfo());
    }, []);

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentPage(newPage);
    };

    const itemsPerPage = 9;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleLikedPhotos = dislikedPhotos.slice(startIndex, endIndex);

    return (
        <div className={styles.dislikes}>
            <Options/>
            <div className={styles.dislikes_content}>
                <div className={styles.dislikes_content_functions}>
                    <BackButton link={'/'}/>
                    <ButtonPinkSecondPage name={'dislikes'} color={'#FFF'} background={'#FF868E'}/>
                </div>
                {
                    loading === 'loading' ? (
                        <div className={styles.dislikes_content_loaderContainer}>
                            <div className={styles.dislikes_content_loaderContainer_loader}>
                                <Loader/>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.dislikes_content_container}>
                            <div className={styles.dislikes_content_container_photos}>
                                {visibleLikedPhotos.map((item, index) => (
                                    <img
                                        className={styles.dislikes_content_container_photos_item}
                                        key={index}
                                        src={item.image.url}
                                        alt={`photo ${item.image_id}`}
                                    />
                                ))}
                            </div>
                            <Pagination
                                className={styles.dislikes_content_container_photos_pagination}
                                count={Math.ceil(dislikedPhotos.length / itemsPerPage)}
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

export default Dislikes;