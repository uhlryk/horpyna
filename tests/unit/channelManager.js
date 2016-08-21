import sinon from "sinon";
import chai from "chai";
import chaiThings from "chai-things";
import Horpyna from "../../dist/index";

chai.use(chaiThings);
const expect = chai.expect;

describe("ChannelManager", () => {

  describe("addChannel method", () => {
    it("should add channel", done => {
      const channels = [];
      const channelManager = new Horpyna.ChannelManager(channels);
      const mockChannel = {};
      channelManager.addChannel(mockChannel);
      expect(channels.length).to.be.equal(1);
      expect(channels).to.include(mockChannel);
      done();
    });
  });

  describe("access to channel", () => {
    const mockName = "123456789";
    const fakeMockName = "234567890";
    const mockChannel = {
      getName: ()=> mockName
    };
    const fakeMockChannel = {
      getName: ()=> fakeMockName
    };
    const channels = [mockChannel];
    const channelManager = new Horpyna.ChannelManager(channels);

    describe("getChannel method", () => {

      it("should get channel by name", done => {
        let channel = channelManager.getChannel(mockName);
        expect(channel).to.be.equal(mockChannel);
        done();
      });

      it("should get undefined if channel by name doesn't exist", done => {
        let channel = channelManager.getChannel(fakeMockName);
        expect(channel).to.be.undefined;
        done();
      });
    });

    describe("getChannels method", () => {

      it("should get channel list", done => {
        let channels = channelManager.getChannels();
        expect(channels).to.be.instanceof(Array);
        done();
      });

    });

    describe("isChannelByName method", () => {

      it("should return true if there is channel with certain name", done => {
        let result = channelManager.isChannelByName(mockName);
        expect(result).to.be.true;
        done();
      });

      it("should return false if there is no channel with certain name", done => {
        let result = channelManager.isChannelByName(fakeMockName);
        expect(result).to.be.false;
        done();
      });
    });

    describe("isChannel method", () => {

      it("should return true if there is certain channel", done => {
        let result = channelManager.isChannel(mockChannel);
        expect(result).to.be.true;
        done();
      });

      it("should return false if there is no certain channel", done => {
        let result = channelManager.isChannel(fakeMockChannel);
        expect(result).to.be.false;
        done();
      });
    });
  });
});
