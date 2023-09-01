import React, {FC, useEffect} from 'react';

import styles from './SearchPage.module.scss';
import Options from "../../components/UI/Options/Options";
import BackButton from "../../components/UI/BackButton/BackButton";
import {MainRoutes} from "../../router/MainRoutes";
import ButtonPinkSecondPage from "../../components/UI/ButtonPinkSecondPage/ButtonPinkSecondPage";
import {useAppSelector} from "../../hooks/reduxHooks";
import {Loader} from "../../components/UI/Loader/Loader";
import {Pagination} from "@mui/material";
import GridPhotos from "../../components/UI/GridPhotos/GridPhotos";

const SearchPage:FC = () => {
    const {input_breed_name} = useAppSelector(state => state.breeds);

    return (
        <div className={styles.searchPage}>
           <Options input_breed_name={input_breed_name} />

            <div className={styles.searchPage_content}>
                <div className={styles.searchPage_content_functions}>
                    {/*<BackButton link={MainRoutes.HOME}/>*/}
                    <BackButton link={'/'}/>
                    <ButtonPinkSecondPage name={'search'} color={'#FFF'} background={'#FF868E'}/>
                </div>
                {
                    1 + 2 === 4 ? (
                        <div className={styles.searchPage_content_loaderContainer}>
                            <div className={styles.searchPage_content_loaderContainer_loader}>
                                <Loader/>
                            </div>
                        </div>
                    ) : null
                }
            </div>

        </div>
    );
};

export default SearchPage;