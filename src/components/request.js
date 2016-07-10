/**
 * Request object which is passed to component onProcess method.
 * It contains calculated data from parent components channels
 */
class Request {
  /**
   *
   * @param data array from parent components channels which are bind to this component
   */
  constructor(data) {
    this.data = data;
  }
}

export default Request;
