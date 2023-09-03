import React, {FC, useEffect} from 'react';

import styles from './GalleryPage.module.scss';
import Options from "../../components/UI/Options/Options";
import BackButton from "../../components/UI/BackButton/BackButton";
import ButtonPinkSecondPage from "../../components/UI/ButtonPinkSecondPage/ButtonPinkSecondPage";
import upload from '../../constants/images/upload.png';
import Modal from "../../components/Modal/Modal";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {UIActions} from "../../redux/slices/UISlice";
import {imagesActions} from "../../redux/slices/imagesSlice";

const GalleryPage: FC = () => {
    const dispatch = useAppDispatch();
    const {modalIsOpen} = useAppSelector(state => state.UI);
    const {uploadedPhotos} = useAppSelector(state => state.images);

    console.log(uploadedPhotos)
    const handleOpenModal = () => {
        dispatch(UIActions.setModalIsOpen(true));
    };

    const getData = async () => {
        await dispatch(imagesActions.getUploadedPhotos());
    }

    useEffect(() => {
        getData();
    }, [])

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
                                    uploadedPhotos ?
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
                                        <div className={styles.gallery_content_photos_notFound}>
                                            No item found
                                        </div>
                                }
                            </div>
                        </div>
                    </>
            }
        </div>
    );
};

export default GalleryPage;