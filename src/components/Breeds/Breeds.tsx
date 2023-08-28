import React, {FC, useEffect, useState} from 'react';

import styles from './Breeds.module.scss';
import BackButton from "../UI/BackButton/BackButton";
import ButtonPinkSecondPage from "../UI/ButtonPinkSecondPage/ButtonPinkSecondPage";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {breedsActions} from "../../redux/slices/breedsSlice";
import {imagesActions} from "../../redux/slices/imagesSlice";
import GridPhotos from "../UI/GridPhotos/GridPhotos";
import Options from "../UI/Options/Options";
import {Loader} from "../UI/Loader/Loader";

const Breeds: FC = () => {
    const dispatch = useAppDispatch();
    const {breeds, breeds_ids_default} = useAppSelector(store => store.breeds);
    const {status} = useAppSelector(state => state.images);

    const [selectedLimit, setSelectedLimit] = useState<number>(5);
    const [selectedBreeds, setSelectedBreeds] = useState<string>(null);

    useEffect(() => {
        const initialData = async () => {
            await dispatch(breedsActions.getAll());
            await dispatch(breedsActions.setCountIds(selectedLimit));
            await dispatch(imagesActions.getImages({ids: breeds_ids_default, limit: selectedLimit}));
        }
        initialData();
    }, [breeds_ids_default, selectedLimit]);

    const handleSelectBreeds = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBreeds(e.target.value);
    }

    useEffect(() => {
        const filteredBreeds = async () => {
            await dispatch(imagesActions.getImages({ids: selectedBreeds, limit: selectedLimit}));
        }
        filteredBreeds();
    }, [selectedBreeds, selectedLimit])

    console.log(selectedBreeds);

    const handleSelectLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLimit(+e.target.value);
    };

    return (

        <div className={styles.breeds}>
            <Options/>
            <div className={styles.breeds_content}>
                <div className={styles.breeds_content_functions}>
                    <BackButton link={'/'}/>
                    <ButtonPinkSecondPage name={'breeds'} color={'#FF868E'} background={'#FBE0DC'}/>

                    <select
                        className={`${styles.breeds_content_functions_select} ${styles.breeds_content_functions_selectBreeds}`}
                        name="breeds"
                        id="breeds-select"
                        onChange={(e) => handleSelectBreeds(e)}
                    >
                        <option value="">All breeds</option>
                        {
                            breeds && breeds.map((item, index) => <option key={index}
                                                                          value={item.id}>{item.name}</option>)
                        }
                    </select>

                    <select
                        className={`${styles.breeds_content_functions_select} ${styles.breeds_content_functions_selectLimit}`}
                        name="limit"
                        id="limit-select"
                        onChange={(e) => handleSelectLimit(e)}
                    >
                        <option value="5">Limit: 5</option>
                        <option value="10">Limit: 10</option>
                        <option value="15">Limit: 15</option>
                        <option value="20">Limit: 20</option>
                    </select>
                </div>
                {
                    status === 'loading' ?
                        <div className={styles.breeds_content_loaderContainer}>
                            <div className={styles.breeds_content_loaderContainer_loader}>
                                <Loader/>
                            </div>
                        </div> :
                        <GridPhotos limit={selectedLimit}/>
                }
            </div>
        </div>
    );
};

export default Breeds;