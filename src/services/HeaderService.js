import headerTemplate from "../../templates/headerTemplate";
import { APP_CONSTANTS } from "../constants/appConstants";

export class HeaderService {
  constructor(authService) {
    this.authService = authService;
  }

  updateHeader() {
    const isLoggedIn = this.authService.isUserAuthenticated();
    const headerElement = document.getElementById(APP_CONSTANTS.DOM_IDS.HEADER);

    if (headerElement) {
      headerElement.innerHTML = headerTemplate(isLoggedIn);
    }
  }
}
