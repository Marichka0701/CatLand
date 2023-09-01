import React, {FC, useEffect, useState} from 'react';
import {Pagination} from '@mui/material';

import styles from './Likes.module.scss';
import Options from '../UI/Options/Options';
import BackButton from '../UI/BackButton/BackButton';
import ButtonPinkSecondPage from '../UI/ButtonPinkSecondPage/ButtonPinkSecondPage';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {votingActions} from '../../redux/slices/votingSlice';
import {Loader} from '../UI/Loader/Loader';
import {IResMoreInfoVote} from "../../interfaces/IResMoreInfoVote";

const Likes: FC = () => {
    const dispatch = useAppDispatch();
    const {likedPhotos, loading} = useAppSelector(state => state.voting);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(votingActions.getMoreInfo());
    }, []);

    const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentPage(newPage);
    };

    const itemsPerPage = 6;

    const calculateVisiblePhotos = (photos: IResMoreInfoVote[], page:number) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return photos.slice(startIndex, endIndex);
    };

    const visibleLikedPhotos = calculateVisiblePhotos(likedPhotos, currentPage);

    return (
        <div className={styles.likes}>
            <Options input_breed_name={''} />

            <div className={styles.likes_content}>
                <div className={styles.likes_content_functions}>
                    <BackButton link={'/'}/>
                    <ButtonPinkSecondPage name={'likes'} color={'#FFF'} background={'#FF868E'}/>
                </div>
                {
                    loading === 'loading' ? (
                        <div className={styles.likes_content_loaderContainer}>
                            <div className={styles.likes_content_loaderContainer_loader}>
                                <Loader/>
                            </div>
                        </div>
                    ) : (
                        likedPhotos ?
                        <div className={styles.likes_content_container}>
                            <div className={styles.likes_content_container_photos}>
                                {visibleLikedPhotos.map((item, index) => (
                                    <img
                                        className={styles.likes_content_container_photos_item}
                                        key={index}
                                        src={item.image.url}
                                        alt={`photo ${item.image_id}`}
                                    />
                                ))}
                            </div>
                            <Pagination
                                count={Math.ceil(likedPhotos.length / itemsPerPage)}
                                variant="outlined"
                                shape="rounded"
                                page={currentPage}
                                onChange={handleChangePage}
                            />
                        </div> :
                            <div className={styles.likes_content_notFound}>
                                No item found
                            </div>
                    )
                }
            </div>
        </div>
    );
};

export default Likes;
