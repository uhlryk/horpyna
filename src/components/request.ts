import Channel from "./channel";

class Request {
  private _value: any;
  private _source: any;
  private _target: any;

  constructor(value:any, source: Channel, target: Channel) {
    this._value = value;
    this._source = source;
    this._target = target;
  }

  getValue(): any {
    return this._value;
  }

  getTarget(): any {
    return this._source;
  }

  getSource(): any {
    return this._target;
  }
}

export default Request;
