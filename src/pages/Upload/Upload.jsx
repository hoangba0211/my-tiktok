import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';

import styles from './Upload.module.scss';

const cx = classNames.bind(styles);

function Upload() {
    return (
        <div className={cx('upload')}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <p className={cx('title')}>Upload video</p>
                    <p className={cx('header-desc')}>Post a video to your account</p>
                </div>
                <div className={cx('container')}>
                    <div className={cx('uploader')}>
                        <input type="file" />
                        <div className={cx('card')}>
                            <img
                                src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg"
                                alt="Select video"
                            />
                            <div className={cx('title')}>
                                <span>Select video to upload</span>
                            </div>
                            <div className={cx('sub')}>
                                <span>Or drag and drop file</span>
                            </div>
                            <div className={cx('video-info')}>
                                <p>MP4 or WebM</p>
                                <p>720x1280 resolution or higher</p>
                                <p>Up to 30 minutes</p>
                                <p>Less than 2 GB</p>
                            </div>
                            <div className={cx('select-btn')}>
                                <Button primary>Select file</Button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('form')}>
                        <div className={cx('editor')}>
                            <div className={cx('editor-wap')}>
                                <div className={cx('editor-icon')}>
                                    <img
                                        src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/divide_black.e1e40d5b.svg"
                                        alt="editor"
                                    />
                                </div>
                                <div className={cx('editor-intro')}>
                                    <h4>Divide videos and edit</h4>
                                    <p>
                                        You can quickly divide videos into multiple parts, remove redundant parts and
                                        turn landscape videos into portrait videos
                                    </p>
                                </div>
                            </div>
                            <div className={cx('editor-btn')}>
                                <Button primary>Edit</Button>
                            </div>
                        </div>
                        <div className={cx('caption')}>
                            <div className={cx('label')}>
                                <span>Caption</span>
                                <span className={cx('require')}>
                                    <span>0</span> / 150
                                </span>
                            </div>
                            <div className={cx('content')}>
                                <input type="text" />
                                <div className={cx('caption-icon','aplabet')}>
                                    <img
                                        src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/at.062a03e9.svg"
                                        alt="caption"
                                    />
                                </div>
                                <div className={cx('caption-icon','tag')}>
                                    <img
                                        src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/hashtag.234f1b9c.svg"
                                        alt="caption"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('cover')}>
                            <div className={cx('label')}>
                                <span>Cover</span>
                            </div>
                            <div className={cx('content')}>
                                <div className={cx('empty')}></div>
                            </div>
                        </div>
                        <div className={cx('regime')}>
                            <div className={cx('label')}>
                                <span>Who can watch this video</span>
                            </div>
                            <div className={cx('regime-select')}>
                                <div className={cx('select-value')}>Public</div>
                                <div className={cx('select')}>
                                    <div className={cx('option')}>Public</div>
                                    <div className={cx('option')}>Friends</div>
                                    <div className={cx('option')}>Private</div>
                                </div>
                                <div className={cx('select-icon')}>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </div>
                            </div>
                        </div>
                        <div className={cx('allow')}>
                            <div className={cx('label')}>
                                <span>Allow users to:</span>
                            </div>
                            <div className={cx('allow-select')}>
                                <div className={cx('option')}>
                                    <div><input type="checkbox" /></div>
                                    <span>Comment</span>
                                </div>
                                <div className={cx('option')}>
                                    <div><input type="checkbox" /></div>
                                    <span>Duet</span>
                                </div>
                                <div className={cx('option')}>
                                    <div><input type="checkbox" /></div>
                                    <span>Stitch</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('check')}>
                            <div className={cx('label')}>
                                <span>Run a copyright check</span>
                            </div>
                            <div className={cx('check-btn')}>
                                <button>check</button>
                            </div>
                        </div>
                        <div className={cx('copyright')}>
                            <p>
                                We'll check your video for potential copyright infringements on used sounds. If
                                infringements are found, you can edit the video before posting.
                                <Link>Learn more</Link>
                            </p>
                        </div>
                        <div className={cx('form-btn')}>
                            <div className={cx('cancel')}>
                                <Button outline>Discard</Button>
                            </div>
                            <div className={cx('submit')}>
                                <Button disabled>Post</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;
