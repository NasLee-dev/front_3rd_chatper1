import Router from "../core/router.js";
import { APP_CONSTANTS } from "../constants/appConstants.js";

export class RouteService {
  constructor(authService, viewService) {
    this.authService = authService;
    this.viewService = viewService;
    this.router = new Router();
  }

  setupRoutes() {
    const mainView = this.viewService.createMainView();
    const loginView = this.viewService.createLoginView();
    const errorView = this.viewService.createErrorView();

    // 기본 라우트 설정
    this.router.setDefaultPage(APP_CONSTANTS.ROUTES.HOME, mainView);
    this.router.addRoutePath(APP_CONSTANTS.ROUTES.MAIN, mainView);
    this.router.addRoutePath(APP_CONSTANTS.ROUTES.PROFILE, () =>
      this.viewService.createProfileView()
    );
    this.router.addRoutePath(APP_CONSTANTS.ROUTES.LOGIN, loginView);
    this.router.setErrorPage(errorView);

    // 인증 가드 설정
    this.setupAuthGuards();
  }

  setupAuthGuards() {
    // 프로필 페이지: 로그인 필요
    this.router.addAuthGuard(APP_CONSTANTS.ROUTES.PROFILE, () => {
      if (this.authService.isUserAuthenticated()) {
        return true;
      }
      this.router.navigate(APP_CONSTANTS.ROUTES.LOGIN);
      return false;
    });

    // 로그인 페이지: 이미 로그인된 경우 메인으로 리다이렉트
    this.router.addAuthGuard(APP_CONSTANTS.ROUTES.LOGIN, () => {
      if (this.authService.isUserAuthenticated()) {
        this.router.navigate(APP_CONSTANTS.ROUTES.HOME);
        return false;
      }
      return true;
    });
  }

  async navigate(path) {
    return await this.router.navigate(path);
  }

  async route() {
    return await this.router.route();
  }

  getRouter() {
    return this.router;
  }
}
