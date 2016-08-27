class State {
  private _value: any;

  constructor(value: any = null) {
    this._value = value;
  }

  public setState(value: any) {
    this._value = value;
  }

  public clearState() {
    this._value = null;
  }

  public getState(): any {
    return this._value;
  }
}

export default State;
