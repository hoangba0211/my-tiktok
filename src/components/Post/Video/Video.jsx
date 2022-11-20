import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeLow, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Video.module.scss';
import { PauseVideoIcon, PlayVideoIcon } from '~/components/Icons';
import Actions from '../Actions/Actions';

const cx = classNames.bind(styles);
const Video = ({ data }) => {
    const videoRef = useRef();
    const ctrlBarRef = useRef();
    const inputRef = useRef();

    const [isPlay, setIsPlay] = useState(true);
    const [isSound, setIsSound] = useState(false);

    const [inputValue, setInputValue] = useState(null);

    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);

    const widthVideo = data.meta.video.resolution_x / 2;
    const heightVideo = data.meta.video.resolution_y / 2;

    useEffect(() => {
        if (!videoRef?.current) return;

        const observer = new IntersectionObserver(intersectionCallback, options);
        observer.observe(videoRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoRef]);

    const handlePlayVideo = () => {
        videoRef.current.play();
    };
    const handlePauseVideo = () => {
        videoRef.current.pause();
    };

    const intersectionCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        });
    };
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.82,
    };

    const handlePregressVideo = () => {
        let currentTime = Math.floor(videoRef.current.currentTime);
        let duration = Math.floor(videoRef.current.duration);
        let ctrlBar = ctrlBarRef.current.style;

        const progressPercent = (currentTime / duration) * 100;
        ctrlBar.width = `${progressPercent}%`;
        inputRef.current.value = progressPercent
    };

    const handleCtrlProgress = () => {
        let inputValue = inputRef.current.value
        let duration = Math.floor(videoRef.current.duration);
        videoRef.current.currentTime = inputValue *duration / 100 
    };
    return (
        <div className={cx('video-container')}>
            <div className={cx('video-card')} style={{ width: widthVideo, height: heightVideo }}>
                <div className={cx('video')}>
                    <video
                        autoPlay
                        ref={videoRef}
                        playsInline={true}
                        muted={isSound}
                        loop
                        onPlay={() => {
                            setIsPlay(false);
                        }}
                        onPause={() => {
                            setIsPlay(true);
                        }}
                        onTimeUpdate={handlePregressVideo}
                    >
                        <source src={data.file_url} type="video/mp4" />
                    </video>
                </div>

                {isPlay ? (
                    <div className={cx('video-change')} onClick={() => handlePlayVideo()}>
                        <PlayVideoIcon />
                    </div>
                ) : (
                    <div className={cx('video-change')} onClick={handlePauseVideo}>
                        <PauseVideoIcon />
                    </div>
                )}

                <div className={cx('video-sound')}>
                    {!isSound ? (
                        <FontAwesomeIcon
                            icon={faVolumeLow}
                            style={{ fontSize: '2rem' }}
                            onClick={() => setIsSound((prev) => !prev)}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faVolumeXmark}
                            style={{ fontSize: '2rem' }}
                            onClick={() => setIsSound((prev) => !prev)}
                        />
                    )}

                    <div className={cx('volume-control')}>
                        <div className={cx('volume-progress')}></div>
                        <div className={cx('volume-circle')}></div>
                        <div className={cx('volume-bar')}></div>
                    </div>
                </div>

                <div className={cx('video-ctrl')}>
                    <div className={cx('ctrl-time')}>
                        <div className={cx('ctrl-input')}>
                            <input
                                ref={inputRef}
                                onChange={handleCtrlProgress}
                                type="range"
                                step='1'
                                min="0"
                                max="100"
                                className={cx('slider')}
                            />
                        </div>
                        <div className={cx('ctrl-bar')} ref={ctrlBarRef}></div>
                    </div>
                    <div className={cx('video-time')}>{`00:00/00:00`}</div>
                </div>
            </div>
            <Actions data={data} />
        </div>
    );
};
export default Video;
