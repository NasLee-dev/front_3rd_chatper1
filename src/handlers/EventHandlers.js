import { APP_CONSTANTS } from "../constants/appConstants";

export class EventHandlers {
  constructor(authService, routeService, headerService, errorBoundary) {
    this.authService = authService;
    this.routeService = routeService;
    this.headerService = headerService;
    this.errorBoundary = errorBoundary;
  }

  async handleNavigation(event) {
    const target = event.target.closest("a");
    if (!target) return;

    event.preventDefault();
    try {
      await this.routeService.navigate(target.pathname);
      this.headerService.updateHeader();
    } catch (error) {
      this.errorBoundary.handleError(error);
    }
  }

  async handleAuthButtons(event) {
    const loginButton = event.target.closest(
      `#${APP_CONSTANTS.DOM_IDS.LOGIN_BUTTON}`
    );
    const logoutButton = event.target.closest(
      `#${APP_CONSTANTS.DOM_IDS.LOGOUT_BUTTON}`
    );

    if (loginButton) {
      event.preventDefault();
      try {
        await this.routeService.navigate(APP_CONSTANTS.ROUTES.LOGIN);
      } catch (error) {
        this.errorBoundary.render(error);
      }
    } else if (logoutButton) {
      event.preventDefault();
      try {
        this.authService.logout();
        this.headerService.updateHeader();
        await this.routeService.navigate(APP_CONSTANTS.ROUTES.HOME);
      } catch (error) {
        this.errorBoundary.render(error);
      }
    }
  }

  async handleFormSubmit(event) {
    const formId = event.target.id;
    try {
      if (formId === APP_CONSTANTS.DOM_IDS.LOGIN_FORM) {
        await this.handleLoginForm(event);
      } else if (formId === APP_CONSTANTS.DOM_IDS.PROFILE_FORM) {
        await this.handleProfileForm(event);
      }
    } catch (error) {
      this.errorBoundary.render(error);
    }
  }

  async handleLoginForm(event) {
    event.preventDefault();

    const usernameInput = document.getElementById(
      APP_CONSTANTS.DOM_IDS.USERNAME_INPUT
    );
    const passwordInput = document.getElementById(
      APP_CONSTANTS.DOM_IDS.PASSWORD_INPUT
    );

    if (!usernameInput || !passwordInput) {
      throw new Error("로그인 폼 요소를 찾을 수 없습니다.");
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      throw new Error("사용자명과 비밀번호를 입력해주세요.");
    }

    this.authService.login(username, password);
    this.routeService.setupRoutes();
    await this.routeService.navigate(APP_CONSTANTS.ROUTES.HOME);
    this.headerService.updateHeader();
  }

  async handleProfileForm(event) {
    event.preventDefault();

    const usernameInput = document.getElementById(
      APP_CONSTANTS.DOM_IDS.USERNAME_INPUT
    );
    const emailInput = document.getElementById(
      APP_CONSTANTS.DOM_IDS.EMAIL_INPUT
    );
    const bioInput = document.getElementById(APP_CONSTANTS.DOM_IDS.BIO_INPUT);

    if (!usernameInput || !emailInput || !bioInput) {
      throw new Error("프로필 폼 요소를 찾을 수 없습니다.");
    }

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const bio = bioInput.value.trim();

    if (!username) {
      throw new Error("사용자명은 필수입니다.");
    }

    this.authService.updateProfile(username, email, bio);
    this.routeService.setupRoutes();
    await this.routeService.navigate(APP_CONSTANTS.ROUTES.PROFILE);
    this.headerService.updateHeader();
  }
}
