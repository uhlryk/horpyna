import Promise from "bluebird";

class Component {
  constructor(componentFunction) {
    this.componentFunction = typeof componentFunction === "function" ? componentFunction : (resolve) => resolve();
  }

  run() {
    this.promise = new Promise(this.componentFunction);
    return this.promise;
  }

  connect() {

  }

  get channel() {

  }
}
export default Component;
