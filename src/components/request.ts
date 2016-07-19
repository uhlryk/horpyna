/**
 * Request object which is passed to component onProcess method.
 * It contains calculated value from parent components channels
 */
class Request {
  public value = [];

  constructor(valueList) {
    this.value = valueList;
  }
}

export default Request;
