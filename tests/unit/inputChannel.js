import sinon from "sinon";
import chai from "chai";
import chaiThings from "chai-things";
import Horpyna from "../../dist/index";

chai.use(chaiThings);
const expect = chai.expect;

describe("InputChannel", () => {
  const channelName = "1234567890";
  const inputChannel = new Horpyna.InputChannel(channelName);

  it("should be instance of Channel", done => {
    expect(inputChannel).to.be.instanceof(Horpyna.Channel);
    done();
  });

  describe("setValue method", () => {

    it("should call callback", done => {
      const mockValue = "123456789";
      const mockChannel = {};
      const spyCallbackFunc = sinon.spy();
      inputChannel.setCallback(spyCallbackFunc);
      inputChannel.setValue(mockValue, mockChannel);
      expect(spyCallbackFunc.calledOnce).to.be.true;
      expect(spyCallbackFunc.args[0][0]).to.be.equal(mockValue);
      expect(spyCallbackFunc.args[0][1]).to.be.equal(mockChannel);
      done();
    });
  });

});
