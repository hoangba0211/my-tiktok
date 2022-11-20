import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import Post from '~/components/Post/Post';
import axios from 'axios';

const cx = classNames.bind(styles);

const PAGE = 1;
function Home() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(PAGE);

    const handleScroll = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop >= e.target.documentElement.scrollHeight) {
            setPage(page + 1);
        }
    };
    useEffect(() => {
        axios
            .get(`https://tiktok.fullstack.edu.vn/api/videos?type=for-you&page=${page}`)
            .then((res) => {
                const newData = [];
                res.data.data.forEach((data) => newData.push(data));
                setPosts((prev) => [...prev, ...newData]);
            })
            .catch((err) => {
                console.log(err);
            });
        window.addEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <div className={cx('wrapper')}>
            {posts.map((post, index) => {
                return <Post key={index} data={post} />;
            })}
        </div>
    );
}

export default Home;
