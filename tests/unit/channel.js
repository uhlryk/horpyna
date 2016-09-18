import sinon from "sinon";
import chai from "chai";
import chaiThings from "chai-things";
import Horpyna from "../../dist/index";

chai.use(chaiThings);
const expect = chai.expect;

describe("Channel", () => {
  const channelName = "123456789";
  const channel = new Horpyna.Channel(channelName);

  it("should be instance of channelManager", done => {
    expect(channel).to.be.instanceof(Horpyna.ChannelManager);
    done();
  });

  describe("getName method", () => {
    it("should return channel name", done => {
      expect(channel.getName()).to.be.equal(channelName);
      done();
    });
  });

  describe("setComponent&getComponent method", () => {
    it("should return component", done => {
      const component = new Horpyna.Component("someComponent");
      channel.setComponent(component);
      expect(channel.getComponent()).to.be.equal(component);
      done();
    });
  });
});
