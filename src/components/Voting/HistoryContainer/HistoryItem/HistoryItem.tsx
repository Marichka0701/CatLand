import React, {FC, PropsWithChildren, useEffect, useState} from 'react';

import styles from './HistoryItem.module.scss';
import dislike from '../../../../constants/images/sadYellowIcon.png';
import fav from '../../../../constants/images/favRedIcon.png';
import like from '../../../../constants/images/smileGreenIcon.png';
import {IResVote} from "../../../../interfaces/IResVote";
import {votingActions} from "../../../../redux/slices/votingSlice";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {IResMoreInfoVote} from "../../../../interfaces/IResMoreInfoVote";

interface IProps extends PropsWithChildren {
    item: IResVote
}

const HistoryItem: FC<IProps> = ({item}) => {
    const {value, image_id, id} = item;
    const [time, setTime] = useState<string>();

    const formattedTime = (data:string) => {
        const date = new Date(data);
        return new Date(date.getTime()).toLocaleTimeString();
    }

    const dispatch = useAppDispatch();
    const {historyExtended} = useAppSelector(state => state.voting);

    useEffect(() => {
        const getData = async () => {
            await dispatch(votingActions.getMoreInfo({id}));
        }
        getData();
    }, []);

    useEffect(() => {
        const specificItem = historyExtended?.find((item:IResMoreInfoVote) => item.id === id);
        setTime(formattedTime(specificItem?.created_at));
    }, [historyExtended])

    const text:Record<string, string> = {
        '1': 'Likes',
        '-1' : 'Dislikes',
    }
    const options = text[value.toString()] || 'Favourites';

    return (
        <div className={styles.history_item}>
            <div>
                <div className={styles.history_item_time}>
                    {time}
                </div>
                <div className={styles.history_item_info}>
                    Image ID: <span>{image_id}</span> was added to {options}
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