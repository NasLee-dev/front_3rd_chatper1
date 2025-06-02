export class User {
  constructor(username = "", email = "", bio = "") {
    this.username = username;
    this.email = email;
    this.bio = bio;
  }

  isLoggedIn() {
    return this.username !== "";
  }

  toJSON() {
    return {
      username: this.username,
      email: this.email,
      bio: this.bio,
    };
  }

  static fromJSON(json) {
    return new User(json.username, json.email, json.bio);
  }
}
