import { MyApp } from './app.component';
import { DiscoverPage } from '../pages/discover/discover';
import { MePage } from '../pages/me/me';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpModule,JsonpModule } from '@angular/http';
import { ConsultDetailPage } from '../pages/home/consultDetail';
import { LastShowPage } from '../pages/home/lastShow';
import {HomePagePop} from '../pages/home/homePopPage';
import {DiscoverDetailPage} from '../pages/discover/discoverDetail';
import {MeLoginPage} from '../pages/me/login';
import {PageForgetPwdStep1} from '../pages/me/forgetPwdStep1';
import {PageForgetPwdStep2} from '../pages/me/forgetPwdStep2';
import {PageForgetPwdStep3} from '../pages/me/forgetPwdStep3';
import {CaptchaComp} from '../directives/captcha';
import {PageRegisterStep1} from '../pages/me/registerStep1';
import {PageRegisterStep2} from '../pages/me/registerStep2';
import {CommentCreatePage} from '../pages/home/commentCreate';
import {CommentListPage} from '../pages/home/commentList';
import {PageProfile} from '../pages/me/profile';

const pages=[
  MyApp,
  DiscoverPage,
  MePage,
  HomePage,
  TabsPage,
  ConsultDetailPage,
  LastShowPage,
  HomePagePop,
  DiscoverDetailPage,
  MeLoginPage,
  PageForgetPwdStep1,
  PageForgetPwdStep2,
  PageForgetPwdStep3,
  CaptchaComp,
  PageRegisterStep1,
  PageRegisterStep2,
  CommentCreatePage,
  CommentListPage,
  PageProfile
];

export default pages;