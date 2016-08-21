import sinon from "sinon";
import chai from "chai";
import chaiThings from "chai-things";
import Horpyna from "../../dist/index";

chai.use(chaiThings);
const expect = chai.expect;

describe("Response", () => {
  const mockValue = "123456789";
  const mockChannelName = "234567891";

  describe("send method", () => {
    it("should call callback", done => {
      const spyCallbackFunc = sinon.spy();
      const response = new Horpyna.Response(spyCallbackFunc);
      response.send(mockValue, mockChannelName);
      expect(spyCallbackFunc.calledOnce).to.be.true;
      expect(spyCallbackFunc.args[0][0]).to.be.equal(mockValue);
      expect(spyCallbackFunc.args[0][1]).to.be.equal(mockChannelName);g
      done();
    });
  });


});
