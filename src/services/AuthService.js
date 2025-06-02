import { User } from "../models/User";
import { APP_CONSTANTS } from "../constants/appConstants";
import useLocalStorage from "../utils/useLocalStorage";

export class AuthService {
  constructor() {
    const initialUser = new User();
    const { getStoredValue, setValue, removeValue } = useLocalStorage(
      APP_CONSTANTS.STORAGE_KEYS.USER,
      initialUser.toJSON()
    );

    this.getStoredValue = getStoredValue();
    this.setValue = setValue;
    this.removeValue = removeValue;
  }

  getCurrentUser() {
    const userData = this.getStoredValue();
    return User.fromJSON(userData);
  }

  isUserAuthenticated() {
    return this.getCurrentUser().isLoggedIn();
  }

  login(username, password) {
    const user = new User(username, "", "");
    this.setValue(user.toJSON());
    return user;
  }

  logout() {
    this.removeValue();
  }

  updateProfile(username, email, bio) {
    const user = new User(username, email, bio);
    this.setValue(user.toJSON());
    return user;
  }
}
