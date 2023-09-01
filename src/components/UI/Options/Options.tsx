import React, {FC, useEffect, useState} from 'react';

import styles from './Options.module.scss';
import search from "./images/search.png";
import smile from "./images/smile.png";
import favourite from "./images/favourite.png";
import sad from "./images/sad.png";
import {useNavigate} from "react-router-dom";
import {MainRoutes} from "../../../router/MainRoutes";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {breedsActions} from "../../../redux/slices/breedsSlice";
import {IBreed} from "../../../interfaces/IBreeds";

interface IProps {
    input_breed_name: string,
}

const Options: FC<IProps> = ({input_breed_name}) => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const {filtered_breeds, breeds} = useAppSelector(state => state.breeds);

    const [isListVisible, setIsListVisible] = useState<boolean>(false);

    console.log(input_breed_name, 'input')

    useEffect(() => {
        setIsListVisible(false);
    }, [input_breed_name])
    const handleNavigateToLikesPage = () => {
        navigate(MainRoutes.LIKES);
    };

    const handleNavigateToFavouritePage = () => {
        navigate(MainRoutes.FAVOURITES);
    };

    const handleNavigateToDislikesPage = () => {
        navigate(MainRoutes.DISLIKES);
    };


    console.log(input_breed_name)
    const handleNavigateToSearchPage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // await dispatch(breedsActions.setInputBreedNameValue(e.target.value));
        // const filteredData = filtered_breeds.filter((item) =>
        //     item.name.toLowerCase().startsWith(e.target.value.toLowerCase()));
        // await dispatch(breedsActions.setFilteredBreeds(filteredData));
        //
        // console.log(e.target.value, 'input current value');
        // console.log(filteredData, 'filtered data');

        console.log(e.target.value)
        // await dispatch(breedsActions.setInputBreedName(e.target.value));
        // const inputValue = input_breed_name;
        const inputValue = e.target.value;
        await dispatch(breedsActions.setInputBreedName(inputValue));
        // await dispatch(breedsActions.setInputBreedNameValue(inputValue));

        const filteredData = breeds.filter((item) =>
            item.name.toLowerCase().startsWith(inputValue.toLowerCase()));
        await dispatch(breedsActions.setFilteredBreeds(filteredData));
        setIsListVisible(prev => !prev);
        navigate(MainRoutes.SEARCH);
    }

    const getBreeds = async () => {
        await dispatch(breedsActions.getAll());
    }

    useEffect(() => {
        getBreeds();
    }, [])

    // useEffect(() => {
    //
    // }, [filtered_breeds])

    console.log('is visible', isListVisible)

    return (
        <div className={styles.options}>
            <div className={styles.options_formContainer}>
                <form className={styles.options_formContainer_form} action="#">
                    <div>
                        <input
                            onChange={(e) => handleNavigateToSearchPage(e)}
                            type="text"
                            placeholder={'Search for breeds by name'}
                            value={input_breed_name}
                        />
                        <div>
                            <img src={search} alt="search icon"/>
                        </div>
                    </div>
                </form>

                <ul className={`${styles.options_formContainer_lists} ${isListVisible ? styles.visible : ''}`}>
                    {
                        filtered_breeds.length > 0 ?
                            filtered_breeds.map((item, index) =>
                                (<li
                                    className={styles.options_formContainer_lists_item}
                                    key={index}

                                >{item.name}</li>)) :
                            <div className={styles.options_notFound}>
                                No item found
                            </div>
                    }
                </ul>
            </div>

            <div className={styles.options_operations}>
                <div
                    onClick={handleNavigateToLikesPage}
                    className={`${styles.options_operations_smile} ${styles.options_operations_standard}`}>
                    <img src={smile} alt="smile icon"/>
                </div>

                <div
                    onClick={handleNavigateToFavouritePage}
                    className={`${styles.options_operations_favourite} ${styles.options_operations_standard}`}>
                    <img src={favourite} alt="favourite icon"/>
                </div>

                <div
                    onClick={handleNavigateToDislikesPage}
                    className={`${styles.options_operations_sad} ${styles.options_operations_standard}`}>
                    <img src={sad} alt="sad icon"/>
                </div>
            </div>
        </div>

    );
};

export default Options;