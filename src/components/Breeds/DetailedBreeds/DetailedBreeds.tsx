import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../../index.css';

import styles from './DetailedBreeds.module.scss';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import Options from "../../UI/Options/Options";
import BackButton from "../../UI/BackButton/BackButton";
import ButtonPinkSecondPage from "../../UI/ButtonPinkSecondPage/ButtonPinkSecondPage";
import {imagesActions} from "../../../redux/slices/imagesSlice";
import {Loader} from "../../UI/Loader/Loader";
import {breedsActions} from "../../../redux/slices/breedsSlice";

const DetailedBreeds = () => {
    const [showLoader, setShowLoader] = useState<boolean>(true);

    const {id} = useParams();

    const {images} = useAppSelector(state => state.images);

    const dispatch = useAppDispatch();

    const {breeds} = useAppSelector(state => state.breeds.selected_breeds);

    const {name, temperament, origin, weight: {metric}, life_span, description} = breeds[0];

    useEffect(() => {
        const getBreedById = async () => {
            // await dispatch(breedsActions.getById({id}));
            await dispatch(imagesActions.getImages({ids: id, limit: 5}));
        }
        getBreedById();

        const timeout = setTimeout(() => {
            setShowLoader(false);
        }, 1200);

        return () => {
            clearTimeout(timeout);
        };

    }, [])

    return (
        <div className={styles.detailedBreeds}>
            <Options/>

            <div className={styles.detailedBreeds_content}>
                <div className={styles.detailedBreeds_content_functions}>
                    <BackButton link={'/breeds'}/>
                    <ButtonPinkSecondPage name={'breeds'} color={'#FF868E'} background={'#FBE0DC'}/>
                    <ButtonPinkSecondPage name={id} color={'#FFF'} background={'#FF868E'}/>
                </div>
                {
                    showLoader ?
                        <div className={styles.detailedBreeds_content_loaderContainer}>
                            <div className={styles.detailedBreeds_content_loaderContainer_loader}>
                                <Loader/>
                            </div>
                        </div> :
                        <div className={styles.detailedBreeds_content_container}>
                        <div className={styles.detailedBreeds_content_container_swiper}>
                            <Swiper
                                // slidesPerView={1}
                                // loop={true}
                                // pagination={{
                                //     clickable: true,
                                // }}

                                // navigation={true}

                                // modules={[Pagination]}
                                className="mySwiper"
                            >
                                {
                                    images.map((item, index) => <SwiperSlide>
                                        <img
                                            className={styles.detailedBreeds_content_container_swiper_item}
                                            src={item.url}
                                            alt="cat`s photo"
                                        />
                                    </SwiperSlide>)
                                }
                            </Swiper>
                        </div>
                        <div className={styles.detailedBreeds_content_container_info}>
                            <h2 className={styles.detailedBreeds_content_container_info_name}>{name}</h2>
                            <h2 className={styles.detailedBreeds_content_container_info_family}>{description}</h2>
                            <div className={styles.detailedBreeds_content_container_info_columns}>
                                <div>
                                    <p>Temperament:</p>
                                    <p>{temperament}</p>
                                </div>
                                <div>
                                    <p>Origin: <span>{origin}</span></p>
                                    <p>Weight: <span>{metric} kgs</span></p>
                                    <p>Life span: <span>{life_span} years</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default DetailedBreeds;