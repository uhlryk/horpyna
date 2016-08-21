import sinon from "sinon";
import chai from "chai";
import chaiThings from "chai-things";
import Horpyna from "../../dist/index";

chai.use(chaiThings);
const expect = chai.expect;

describe("CallbackChannel", () => {
  const channelName = "1234567890";
  const callbackChannel = new Horpyna.CallbackChannel(channelName);

  it("should be instance of InputChannel", done => {
    expect(callbackChannel).to.be.instanceof(Horpyna.InputChannel);
    done();
  });

  describe("setValue method", () => {

    it("should call callback", done => {
      const mockValue = "123456789";
      const mockChannel = {};
      const spyCallbackFunc = sinon.spy();
      callbackChannel.setCallback(spyCallbackFunc);
      callbackChannel.setValue(mockValue, mockChannel);
      expect(spyCallbackFunc.calledOnce).to.be.true;
      expect(spyCallbackFunc.args[0][0]).to.be.equal(mockValue);
      expect(spyCallbackFunc.args[0][1]).to.be.equal(mockChannel);
      done();
    });
  });

});
