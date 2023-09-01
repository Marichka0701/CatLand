import React, {FC, useEffect, useState} from 'react';
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

const DetailedBreeds:FC = () => {
    const [showLoader, setShowLoader] = useState<boolean>(true);

    const {id} = useParams();

    const {photos} = useAppSelector(state => state.images);
    const getRandomPhotosByBreed = async () => {
        await dispatch(imagesActions.getPhotos({ids: id, limit: 5}));
    }

    const dispatch = useAppDispatch();

    const {selected_breed: {breeds} } = useAppSelector(state => state.breeds);
    const {name, temperament, origin, weight: {metric}, life_span, description} = breeds[0];


    useEffect(() => {
        getRandomPhotosByBreed();

        const timeout = setTimeout(() => {
            setShowLoader(false);
        }, 1200);

        return () => {
            clearTimeout(timeout);
        };

    }, [])

    return (
        <div className={styles.detailedBreeds}>
            <Options input_breed_name={''} />

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
                                slidesPerView={1}
                                loop={true}
                                pagination={{
                                    clickable: true,
                                }}
                                spaceBetween={'20px'}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                                {
                                    photos.map((item, index) => <SwiperSlide>
                                        <img
                                            key={index}
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