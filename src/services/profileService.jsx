import * as request from '~/utils/request';

export const getProfile = async (user) => {
    try {
        const res = await request.get(`users/@${user}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
