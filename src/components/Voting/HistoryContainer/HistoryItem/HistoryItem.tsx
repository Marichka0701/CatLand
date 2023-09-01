import React, {FC, PropsWithChildren, useEffect, useState} from 'react';

import styles from './HistoryItem.module.scss';
import dislike from '../../../../constants/images/sadYellowIcon.png';
import fav from '../../../../constants/images/favRedIcon.png';
import like from '../../../../constants/images/smileGreenIcon.png';
import {IResVote} from "../../../../interfaces/IResVote";
import {votingActions} from "../../../../redux/slices/votingSlice";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {IResMoreInfoVote} from "../../../../interfaces/IResMoreInfoVote";
import {favouriteActions} from "../../../../redux/slices/favouritesSlice";

interface IProps extends PropsWithChildren {
    item: IResVote
}

const HistoryItem: FC<IProps> = ({item}) => {
    const {value, image_id, id} = item;
    const [time, setTime] = useState<string>();

    console.log('props - ', item)
    const formattedTime = (data: string) => {
        const date = new Date(data);
        return new Date(date.getTime()).toLocaleTimeString();
    }

    const dispatch = useAppDispatch();
    const {historyExtended} = useAppSelector(state => state.voting);
    const {favouritePhotos} = useAppSelector(state => state.favourite);

    console.log(favouritePhotos)

    useEffect(() => {
        const getData = async () => {
            await dispatch(votingActions.getMoreInfo());
            await dispatch(favouriteActions.getAll());
        }
        getData();
    }, []);

    useEffect(() => {
        const setData = async () => {
            const specificItem = await historyExtended?.find((item: IResMoreInfoVote) => item.id === id);
            setTime(formattedTime(specificItem?.created_at));
        }
        setData();
    }, [historyExtended])

    const text: Record<string, string> = {
        '1': 'Likes',
        '-1': 'Dislikes',
    }
    const options = text[value?.toString()] || 'Favourites';

    return (
        <div className={styles.history_item}>
            <div>
                <div className={styles.history_item_time}>
                    {options === 'Favourites' ? formattedTime(favouritePhotos[0].created_at) : time !== 'Invalid Date' ? time : ''}
                </div>
                <div className={styles.history_item_info}>
                    Image ID: {
                    options === 'Favourites' ? <span>{favouritePhotos[0].image_id}</span> :
                        <span>{image_id}</span>
                } was added to {options}
                </div>
            </div>

            <div className={styles.history_item_icon}>
                <img
                    src={options === 'Likes' ? like : options === 'Dislikes' ? dislike : fav}
                />
            </div>
        </div>
    );
};

export default HistoryItem;