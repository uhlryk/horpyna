/**
 * Request object which is passed to component onProcess method.
 * It contains calculated value from parent components channels
 */
class Request {
  /**
   *
   * @param valueList array from parent components channels which are bind to this component
   */
  constructor(valueList) {
    this.value = valueList;
  }
}

export default Request;
