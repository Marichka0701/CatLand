import React, {FC, useEffect, useState} from 'react';

import styles from './Breeds.module.scss';
import search from '../UI/Options/images/search.png';
import smile from '../UI/Options/images/smile.png';
import favourite from '../UI/Options/images/favourite.png';
import sad from '../UI/Options/images/sad.png';
import BackButton from "../UI/BackButton/BackButton";
import ButtonPinkSecondPage from "../UI/ButtonPinkSecondPage/ButtonPinkSecondPage";
import {IBreeds} from "../../interfaces/IBreeds";
import AB from './images/AB_sorting.png';
import BA from './images/BA_sorting.png';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {breedsActions} from "../../redux/slices/breedsSlice";
import {imagesActions} from "../../redux/slices/imagesSlice";
import GridPhotos from "../UI/GridPhotos/GridPhotos";
import Options from "../UI/Options/Options";

const Breeds: FC = () => {
    const dispatch = useAppDispatch();
    const {breeds, breeds_ids_default} = useAppSelector(store => store.breeds);

    const [selectedLimit, setSelectedLimit] = useState<number>(5);

    useEffect(() => {
        const initialData = async () => {
            await dispatch(breedsActions.getAll());
            await dispatch(imagesActions.getImages({ids: breeds_ids_default, limit: selectedLimit}));
        }
        initialData();

    //     fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=abys,aege,abob,acur,asho&limit=5`, {
    //         headers: {
    //             'x-api-key': 'live_9XyMuVxuNNkFBccqEtoaWtGFbrek4oEMT80wjhnsz6LJwwbWDtCo7loKnD8h0GX9'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             // Тут ви можете обробити дані, які отримали від сервера
    //         })
    //         .catch(error => {
    //             // Тут ви можете обробити помилку, якщо вона виникла під час запиту
    //         })
    //
    //     // fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breeds_ids_default.join(',')}&limit=5`).then(value => value.json()).then(value => console.log(value))
    }, [selectedLimit]);

    const handleSelectedLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLimit(+e.target.value);
    };

    return (
        <div className={styles.breeds}>
            <Options/>
            <div className={styles.breeds_content}>
                <div className={styles.breeds_content_functions}>
                    <BackButton link={'/home'}/>
                    <ButtonPinkSecondPage name={'breeds'} color={'#FF868E'} background={'#FBE0DC'}/>

                    <select
                        className={`${styles.breeds_content_functions_select} ${styles.breeds_content_functions_selectBreeds}`}
                        name="breeds"
                        id="breeds-select"
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
                        onChange={(e) => handleSelectedLimit(e)}
                    >
                        <option value="5">Limit: 5</option>
                        <option value="10">Limit: 10</option>
                        <option value="15">Limit: 15</option>
                        <option value="20">Limit: 20</option>
                    </select>

                    <button className={styles.breeds_content_functions_button}>
                        <img src={AB} alt="sorting from A to B logo"/>
                    </button>

                    <button className={styles.breeds_content_functions_button}>
                        <img src={AB} alt="sorting from A to B logo"/>
                    </button>
                </div>

                <GridPhotos limit={selectedLimit}/>
            </div>
        </div>
    );
};

export default Breeds;