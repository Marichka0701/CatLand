import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import styles from './Likes.module.scss';
import Options from '../UI/Options/Options';
import BackButton from '../UI/BackButton/BackButton';
import ButtonPinkSecondPage from '../UI/ButtonPinkSecondPage/ButtonPinkSecondPage';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { votingActions } from '../../redux/slices/votingSlice';
import { Loader } from '../UI/Loader/Loader';

const Likes = () => {
    const dispatch = useAppDispatch();
    const { likedPhotos, loading } = useAppSelector(state => state.voting);

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
    const visibleLikedPhotos = likedPhotos.slice(startIndex, endIndex);

    return (
        <div className={styles.likes}>
            <Options />
            <div className={styles.likes_content}>
                <div className={styles.likes_content_functions}>
                    <BackButton link={'/'} />
                    <ButtonPinkSecondPage name={'likes'} color={'#FFF'} background={'#FF868E'} />
                </div>
                {loading === 'loading' ? (
                    <div className={styles.likes_content_loaderContainer}>
                        <div className={styles.likes_content_loaderContainer_loader}>
                            <Loader />
                        </div>
                    </div>
                ) : (
                    <div className={styles.likes_content_photos}>
                        {visibleLikedPhotos.map((item, index) => (
                            <img
                                className={styles.likes_content_photos_item}
                                key={index}
                                src={item.image.url}
                                alt={`photo ${item.image_id}`}
                            />
                        ))}
                        <Pagination
                            count={Math.ceil(likedPhotos.length / itemsPerPage)}
                            variant="outlined"
                            shape="rounded"
                            page={currentPage}
                            onChange={handleChangePage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Likes;
