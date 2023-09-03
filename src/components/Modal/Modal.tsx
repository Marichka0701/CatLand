import React, {FC, useRef, useState} from 'react';
import {Link} from "react-router-dom";

import styles from './Modal.module.scss';
import uploadBackground from '../../constants/images/upload_background.png';
import close from '../../constants/images/close_button.png';
import {UIActions} from "../../redux/slices/UISlice";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {imagesActions} from "../../redux/slices/imagesSlice";
import ButtonPinkSecondPage from "../UI/ButtonPinkSecondPage/ButtonPinkSecondPage";

const Modal: FC = () => {
    const [selectedPhoto, setSelectedPhoto] = useState<string>('');
    const [filename, setFilename] = useState<string>('');

    const dispatch = useAppDispatch();

    const handleCloseModal = () => {
        dispatch(UIActions.setModalIsOpen(false));
    }

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleRefToInput = () => {
        fileInputRef.current.click();
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];

        if (file) {
            setFilename(file.name);
            const imageURL = URL.createObjectURL(file);
            setSelectedPhoto(imageURL);
        }
    };

    const handleUploadPhoto = async () => {
        if (selectedPhoto) {
            await dispatch(imagesActions.uploadPhoto({file: fileInputRef.current?.files?.[0], sub_id: 'marichka_tanechnyk'}));
        }
    }

    return (
        <div className={styles.modal}>
            <button
                onClick={handleCloseModal}
                className={styles.modal_close}
            >
                <img src={close} alt="close button icon"/>
            </button>

            <div className={styles.modal_titlesContainer}>
                <h2 className={styles.modal_titlesContainer_title}>Upload a .jpg or .png Cat Image</h2>
                <p className={styles.modal_titlesContainer_description}>
                    Any uploads must comply with the
                    <Link to={'https://thecatapi.com/privacy'}> <span>upload guidelines</span> </Link>
                    or face deletion.
                </p>
            </div>

            <input
                type="file"
                accept=".jpg, .png"
                onChange={handleFileSelect}
                style={{display: 'none'}}
                ref={fileInputRef}
            />

            <div
                onClick={handleRefToInput}
                style={{backgroundImage: `url(${uploadBackground})`}}
                className={styles.modal_upload}
            >
                {
                    selectedPhoto ?
                        <img
                            className={styles.modal_upload_photo}
                            src={selectedPhoto}
                            alt="cat`s photo"/> :
                        <><span>Drag here</span>&nbsp;your file or&nbsp;<span>Click here</span>&nbsp;to upload</>
                }
            </div>

            <div className={styles.modal_status}>
                {
                    filename ?
                        <span>Image File Name: {filename}</span> :
                        <span>No file selected</span>
                }
            </div>

            {
                selectedPhoto &&
                <button
                    onClick={handleUploadPhoto}
                    className={styles.modal_uploadButton}
                >Upload photo</button>
            }
        </div>
    );
};

export default Modal;