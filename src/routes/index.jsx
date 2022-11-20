import routesConfig from '~/config/routes';

import Home from '~/pages/Home/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload/Upload';
import HeaderLayout from '~/layouts/HeaderLayout';
import Profile from '~/pages/Profile/Profile';
import LogoutUser from '~/components/ModalLogin/LogoutUser/LogoutUser';

const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.following, component: Following },
    { path: routesConfig.profile, component: Profile },
    { path: routesConfig.upload, component: Upload, layout: HeaderLayout },
    { path: routesConfig.logout, component: LogoutUser },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
