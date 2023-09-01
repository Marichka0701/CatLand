import React, {FC, useEffect, useState} from 'react';

import styles from './Voting.module.scss';
import Options from "../UI/Options/Options";
import BackButton from "../UI/BackButton/BackButton";
import ButtonPinkSecondPage from "../UI/ButtonPinkSecondPage/ButtonPinkSecondPage";
import {imagesActions} from "../../redux/slices/imagesSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {Loader} from "../UI/Loader/Loader";
import smile from '../../constants/images/smileWhiteIcon.png';
import fav from '../../constants/images/favWhiteIcon.png';
import sad from '../../constants/images/sadWhiteIcon.png';
import GridPhotos from "../UI/GridPhotos/GridPhotos";
import {votingService} from "../../services/voting.service";
import {votingActions} from "../../redux/slices/votingSlice";
import {History} from "swiper/types/modules";
import HistoryContainer from "./HistoryContainer/HistoryContainer";
import {favouriteActions} from "../../redux/slices/favouritesSlice";
import {IResMoreInfoVote} from "../../interfaces/IResMoreInfoVote";
import {IResVote} from "../../interfaces/IResVote";

const Voting:FC = () => {
    const dispatch = useAppDispatch();

    const [url, setUrl] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [imageId, setImageId] = useState<string>('');
    // const [allHistory, setAllHistory] = useState<IResVote | IR[]>([]);

    const {randomPhotoForVoting, status} = useAppSelector(state => state.images);
    const {sub_id, like, dislike, history} = useAppSelector(state => state.voting);
    const {favouritePhotos} = useAppSelector(state => state.favourite);

    // const {url, id} = randomImage[0];
    const getData = async () => {
        await dispatch(imagesActions.getRandomPhotoForVoting());
        await dispatch(favouriteActions.getAll());
    }

    console.log(favouritePhotos, 'fav photos')

    useEffect(() => {
        getData();
    }, [])

    // useEffect(() => {
        // setAllHistory([...favouritePhotos, ...history]);
    // }, [history, favouritePhotos])

    console.log('history', history)

    useEffect(() => {
        if (randomPhotoForVoting && randomPhotoForVoting.length > 0) {
            setUrl(randomPhotoForVoting[0]?.url);
            setId(randomPhotoForVoting[0]?.id);
            setImageId(randomPhotoForVoting[0]?.id);
        }
    }, [randomPhotoForVoting]);

    const handleVoteLike = async () => {
        await dispatch(votingActions.vote({params: {image_id: imageId, sub_id, value: like}}));
        await getData();
    }

    const handleVoteDislike = async () => {
        await dispatch(votingActions.vote({params: {image_id: imageId, sub_id, value: dislike}}));
        await getData();
    }

    const handleAddToFavourites = async () => {
        await dispatch(votingActions.addToFavourite({params: {image_id: imageId, sub_id}}));
        await getData();
    }

    return (
        <div className={styles.voting}>
            <Options input_breed_name={''} />
            <div className={styles.voting_content}>
                <div className={styles.voting_content_functions}>
                    <BackButton link={'/'}/>
                    <ButtonPinkSecondPage name={'voting'} color={'#FFF'} background={'#FF868E'}/>
                </div>

                <div className={styles.voting_content_container}>
                    {
                        status === 'loading' ?
                            <div className={styles.voting_content_container_loaderContainer}>
                                <div className={styles.voting_content_container_loaderContainer_loader}>
                                    <Loader/>
                                </div>
                            </div> :
                            <>
                                <img
                                    className={styles.voting_content_container_photo}
                                    src={url}
                                    alt="cat`s photo"
                                />

                                <div className={styles.voting_content_container_rates}>
                                    <div
                                        onClick={handleVoteLike}
                                        className={`${styles.voting_content_container_rates_item} ${styles.voting_content_container_rates_like}`}
                                    >
                                        <img src={smile} alt="like white icon"/>
                                    </div>
                                    <div
                                        onClick={handleAddToFavourites}
                                        className={`${styles.voting_content_container_rates_item} ${styles.voting_content_container_rates_fav}`}
                                    >
                                        <img src={fav} alt="favourite white icon"/>
                                    </div>
                                    <div
                                        onClick={handleVoteDislike}
                                        className={`${styles.voting_content_container_rates_item} ${styles.voting_content_container_rates_dislike}`}
                                    >
                                        <img src={sad} alt="dislike white icon"/>
                                    </div>
                                </div>

                                <HistoryContainer history={history}/>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Voting;