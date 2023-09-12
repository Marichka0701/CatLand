import React, {FC} from 'react';

import styles from './GalleryPage.module.scss';
import Options from "../../components/UI/Options/Options";
import BackButton from "../../components/UI/BackButton/BackButton";
import ButtonPinkSecondPage from "../../components/UI/ButtonPinkSecondPage/ButtonPinkSecondPage";
import upload from '../../constants/images/upload.png';
import Modal from "../../components/Modal/Modal";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {UIActions} from "../../redux/slices/UISlice";
import {Loader} from "../../components/UI/Loader/Loader";

const GalleryPage: FC = () => {
    const dispatch = useAppDispatch();
    const {modalIsOpen} = useAppSelector(state => state.UI);
    const {uploadedPhotos, status} = useAppSelector(state => state.images);

    const handleOpenModal = () => {
        dispatch(UIActions.setModalIsOpen(true));
    };

    return (
        <div className={styles.gallery}>
            {
                modalIsOpen ?
                    <Modal/> :
                    <>
                        <Options input_breed_name={''}/>

                        <div className={styles.gallery_content}>
                            <div className={styles.gallery_content_functions}>
                                <div>
                                    <BackButton link={'/'}/>
                                    <ButtonPinkSecondPage name={'gallery'} color={'#FFF'} background={'#FF868E'}/>
                                </div>

                                <div>
                                    <button
                                        onClick={handleOpenModal}
                                    >
                                        <img src={upload} alt="upload icon"/>
                                        <p>Upload</p>
                                    </button>
                                </div>
                            </div>
                            <div className={styles.gallery_content_photos}>
                                {
                                    uploadedPhotos.length !==0 ?
                                        <div className={styles.gallery_content_photos_container}>
                                            {
                                                uploadedPhotos.map((item, index) =>
                                                    <img
                                                        className={styles.gallery_content_photos_container_item}
                                                        key={index}
                                                        src={item.url}
                                                        alt="cat`s photo"
                                                    />)
                                            }
                                        </div> :
                                        <>
                                            {
                                                status === 'loading' ?
                                                    <div className={styles.gallery_content_photos_loaderContainer}>
                                                        <div className={styles.gallery_content_photos_loaderContainer_loader}>
                                                            <Loader/>
                                                        </div>
                                                    </div> :
                                                <div className={styles.gallery_content_photos_notFound}>
                                                    There are no photos uploaded by you :(
                                                </div>
                                            }
                                        </>
                                }
                            </div>
                        </div>
                    </>
            }
        </div>
    );
};

export default GalleryPage;