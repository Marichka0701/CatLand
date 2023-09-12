import React, {FC, useRef, useState} from 'react';
import {Link} from "react-router-dom";

import styles from './Modal.module.scss';
import uploadBackground from '../../constants/images/upload_background.png';
import close from '../../constants/images/close_button.png';
import {UIActions} from "../../redux/slices/UISlice";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {imagesActions} from "../../redux/slices/imagesSlice";
import successful from '../../constants/images/successful.png';
import rejected from '../../constants/images/rejected.png';

const Modal: FC = () => {
    const [selectedPhoto, setSelectedPhoto] = useState<string>('');
    const [filename, setFilename] = useState<string>('');
    const [file, setFile] = useState<File>(null);

    const {uploadResponseStatus} = useAppSelector(state => state.images);

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
            setFile(fileInputRef.current?.files?.[0]);
            const imageURL = URL.createObjectURL(file);
            setSelectedPhoto(imageURL);
        }
    };

    const handleUploadPhoto = async () => {
        if (selectedPhoto) {
            await dispatch(imagesActions.uploadPhoto({file, sub_id: 'marichka_tanechnyk'}));
        }
        // setSelectedPhoto('');

        // closing modal if response was successful
        // uploadResponseStatus === 201 && dispatch(UIActions.setModalIsOpen(false));
    }

    console.log(uploadResponseStatus)

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
                style={{backgroundImage: selectedPhoto ? '' : `url(${uploadBackground})`}}
                className={`${styles.modal_upload} ${uploadResponseStatus === 400 ? styles.rejected : ''}`}
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
                    selectedPhoto ?
                        <span>Image File Name: {filename}</span> :
                        <span>No file selected</span>
                }
            </div>

            {
                (selectedPhoto && !uploadResponseStatus) ?
                <button
                    onClick={handleUploadPhoto}
                    className={styles.modal_uploadButton}
                >Upload photo</button> :
                    (
                        (uploadResponseStatus && selectedPhoto) &&
                        <div className={styles.modal_isRecognized}>
                            <img
                                src={uploadResponseStatus === 201 ? successful : rejected}
                                alt={`${uploadResponseStatus === 201 ? 'successful' : 'rejected'} request icon`}
                            />
                            <p>{uploadResponseStatus === 201 ? 'Thanks for the Upload - Cat found!' : 'No Cat found - try a different one'}</p>
                        </div>
                    )

            }
        </div>
    );
};

export default Modal;