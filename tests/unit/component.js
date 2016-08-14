import sinon from "sinon";
import chai from "chai";
import chaiThings from "chai-things";
import Horpyna from "../../dist/index";

chai.use(chaiThings);
const expect = chai.expect;

describe("Component", () => {

  describe("constructor", () => {

    it("should trigger onInit method", done => {
      let onInitSpy = sinon.spy(Horpyna.Component.prototype, "onInit");
      new Horpyna.Component();
      expect(onInitSpy.calledOnce).to.be.true;
      onInitSpy.restore();
      done();
    });

    it("should trigger onInit method and pass options object from constructor params", done => {
      let onInitSpy = sinon.spy(Horpyna.Component.prototype, "onInit");
      let options = {};
      new Horpyna.Component(options);
      expect(onInitSpy.calledOnce).to.be.true;
      expect(onInitSpy.args[0][0]).to.be.equal(options);
      onInitSpy.restore();
      done();
    });
  });

  describe("start method", () => {

    it("should trigger next method with request args when default channel name", done => {
      const value = "AAAA";
      let nextSpy = sinon.spy(Horpyna.Component.prototype, "next");
      let component = new Horpyna.Component();
      component.start(value);
      expect(nextSpy.calledOnce).to.be.true;
      let request = nextSpy.args[0][0];
      expect(request).to.be.an.instanceof(Horpyna.Request);
      expect(request.getValue()).to.be.equal(value);
      let targetChannel = request.getTarget();
      expect(targetChannel).to.be.an.instanceof(Horpyna.InputChannel);
      expect(targetChannel.getName()).to.be.equal(Horpyna.CHANNEL.DEFAULT_CHANNEL);
      nextSpy.restore();
      done();
    });

  });
  describe("createInputChannel & getInputChannel method", () => {
    let channelName = "AAAA";
    it("should create new channel and return it back", done => {
      let component = new Horpyna.Component();
      component.createInputChannel(channelName);
      let channel = component.getInputChannel(channelName);
      expect(channel).to.be.an.instanceof(Horpyna.InputChannel);
      expect(channel.getName()).to.be.equal(channelName);
      done();
    });

    it("should create default channel in constructor and get it by name", done => {
      let component = new Horpyna.Component();
      let channel = component.getInputChannel(Horpyna.CHANNEL.DEFAULT_CHANNEL);
      expect(channel).to.be.an.instanceof(Horpyna.InputChannel);
      expect(channel.getName()).to.be.equal(Horpyna.CHANNEL.DEFAULT_CHANNEL);
      done();
    });

    it("should create default channel in constructor and get it by default value", done => {
      let component = new Horpyna.Component();
      let channel = component.getInputChannel();
      expect(channel).to.be.an.instanceof(Horpyna.InputChannel);
      expect(channel.getName()).to.be.equal(Horpyna.CHANNEL.DEFAULT_CHANNEL);
      done();
    });

    it("should throw error when trying create channel with existing name", done => {
      let component = new Horpyna.Component();
      component.createInputChannel(channelName);
      expect(component.createInputChannel.bind(component, channelName)).to.throw(Error, Error.UNIQUE_NAME_INPUT_CHANNEL);
      done();
    });

    it("should throw error when trying get non-existent channel", done => {
      let component = new Horpyna.Component();
      expect(component.getInputChannel.bind(component, channelName)).to.throw(Error, Error.NON_EXIST_CHANNEL);
      done();
    });
  });

  describe("createOutputChannel & getOutputChannel method", () => {
    let channelName = "AAAA";
    it("should create new channel and return it back", done => {
      let component = new Horpyna.Component();
      component.createOutputChannel(channelName);
      let channel = component.getOutputChannel(channelName);
      expect(channel).to.be.an.instanceof(Horpyna.OutputChannel);
      expect(channel.getName()).to.be.equal(channelName);
      done();
    });

    it("should create default channel in constructor", done => {
      let component = new Horpyna.Component();
      let channel = component.getOutputChannel();
      expect(channel).to.be.an.instanceof(Horpyna.OutputChannel);
      expect(channel.getName()).to.be.equal(Horpyna.CHANNEL.DEFAULT_CHANNEL);
      done();
    });

    it("should throw error when trying create channel with existing name", done => {
      let component = new Horpyna.Component();
      component.createOutputChannel(channelName);
      expect(component.createOutputChannel.bind(component, channelName)).to.throw(Error, Error.UNIQUE_NAME_INPUT_CHANNEL);
      done();
    });

    it("should throw error when trying get non-existent channel", done => {
      let component = new Horpyna.Component();
      expect(component.getOutputChannel.bind(component, channelName)).to.throw(Error, Error.NON_EXIST_CHANNEL);
      done();
    });
  });

  describe("next method", () => {
    it("should trigger onNext method with request and response objects", done => {
      let dummyValue = "BBBB";
      sinon.stub(Horpyna.Component.prototype, "onNext", (request, response) => {
        expect(request).to.be.an.instanceof(Horpyna.Request);
        expect(request.getValue()).to.be.equal(dummyValue);
        expect(response).to.be.an.instanceof(Horpyna.Response);
        done();
      });
      let component = new Horpyna.Component();
      component.next(new Horpyna.Request(dummyValue, null, component.getInputChannel(Horpyna.CHANNEL.DEFAULT_CHANNEL)));
    });
  });

});
