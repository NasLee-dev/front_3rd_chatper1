import errorTemplate from "../../templates/errorTemplate";
import loginTemplate from "../../templates/loginTemplate";
import mainTemplate from "../../templates/mainTemplate";
import ProfileTemplate from "../../templates/profileTemplate";
import { APP_CONSTANTS } from "../constants/appConstants";
import ErrorView from "../page/errorView";
import LoginView from "../page/loginView";
import MainView from "../page/mainView";
import ProfileView from "../page/profileView";

export class ViewService {
  constructor(authService) {
    this.authService = authService;
  }

  createMainView() {
    const isLoggedIn = this.authService.isUserAuthenticated();
    return new MainView(APP_CONSTANTS.DOM_IDS.ROOT, mainTemplate(isLoggedIn));
  }

  createLoginView() {
    return new LoginView(APP_CONSTANTS.DOM_IDS.ROOT, loginTemplate);
  }

  createProfileView() {
    const currentUser = this.authService.getCurrentUser();
    const isLoggedIn = currentUser.isLoggedIn();
    return new ProfileView(
      APP_CONSTANTS.DOM_IDS.ROOT,
      ProfileTemplate(isLoggedIn, currentUser)
    );
  }

  createErrorView() {
    return new ErrorView(APP_CONSTANTS.DOM_IDS.ROOT, errorTemplate);
  }
}
