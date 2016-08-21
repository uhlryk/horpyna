import sinon from "sinon";
import chai from "chai";
import chaiThings from "chai-things";
import Horpyna from "../../dist/index";

chai.use(chaiThings);
const expect = chai.expect;

describe("OutputChannel", () => {
  const channelName = "123456789";
  const mockChannel = {
    setValue: ()=> {}
  };
  const mockValue = "123456789";
  const channels = [mockChannel];
  const outputChannel = new Horpyna.OutputChannel(channelName, channels);

  describe("emitValue", () => {
    it("should trigger setValue from each channel stored", done => {
      const setValueStub = sinon.stub(mockChannel, "setValue", (value, oChannel) => {
        expect(outputChannel).to.be.equal(oChannel);
        expect(mockValue).to.be.equal(value);
        setValueStub.restore();
        done();
      });
      outputChannel.emitValue(mockValue);
    });
  });
});
