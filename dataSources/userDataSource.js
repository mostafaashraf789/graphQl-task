const { DataSource } = require("apollo-datasource");

class UserDataSource extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  async getUserById(id) {
    return await this.store.User.findById(id);
  }
}

module.exports = UserDataSource;
