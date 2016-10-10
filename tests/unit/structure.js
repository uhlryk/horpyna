import sinon from "sinon";
import chai from "chai";
import chaiThings from "chai-things";
import Horpyna from "../../dist/index";

chai.use(chaiThings);
const expect = chai.expect;

describe("Structure", () => {

  describe("createComponent & getComponent methods", () => {
    let structure;
    before(done => {
      structure = new Horpyna.Structure();
      done();
    });

    it("should create and get component without options", done => {
      const componentName = "myComponent";
      structure.createComponent(componentName, Horpyna.Component);
      const component = structure.getComponent(componentName);
      expect(component).to.be.instanceof(Horpyna.Component);
      done();
    });
  });

  describe("createJoint & getJoint methods", () => {

    let structure, sourceComponent, sourceChannel, targetComponent, targetChannel;
    const sourceComponentName = "sourceComponent";
    const sourceChannelName = "sourceChannel";
    const targetComponentName = "targetComponent";
    const targetChannelName = "targetChannel";
    before(done => {
      structure = new Horpyna.Structure();
      structure.createComponent(sourceComponentName, Horpyna.Component)
        .createOutputChannel(sourceChannelName);
      structure.createComponent(targetComponentName, Horpyna.Component)
        .createInputChannel(targetChannelName);
      sourceComponent = structure.getComponent(sourceComponentName);
      sourceChannel = sourceComponent.getOutputChannel(sourceChannelName);
      targetComponent = structure.getComponent(targetComponentName);
      targetChannel = targetComponent.getInputChannel(targetChannelName);
      done();
    });

    it("should create and get joint", done => {
      const jointName = "jointName";
      structure.createJoint(jointName, sourceChannel, targetChannel);
      const joint = structure.getJoint(jointName);
      expect(joint).to.be.instanceof(Horpyna.Joint);
      expect(joint.getName()).to.be.equal(jointName);
      const sourceChannelFromJoint = joint.getSource();
      const targetChannelFromJoint = joint.getTarget();
      expect(sourceChannelFromJoint.getName()).to.be.equal(sourceChannelName);
      expect(targetChannelFromJoint.getName()).to.be.equal(targetChannelName);
      done();
    });

  });
  // TODO: tests for callbacks

  //describe("createJoint method", () => {
  //
  //
  //
  //  it("should throw error when target channel non exist", done => {
  //    const currentChannelName = "fsg423";
  //    const targetChannelName = "aewawe3";
  //    const currentComponent = new Horpyna.Component();
  //    currentComponent.createOutputChannel(currentChannelName);
  //    const targetComponent = new Horpyna.Component();
  //    expect(currentComponent.createJoint.bind(currentComponent, targetComponent, currentChannelName, targetChannelName)).to.throw(Error, Error.NON_EXIST_CHANNEL);
  //    done();
  //  });
  //
  //  it("should throw error when current channel non exist", done => {
  //    const currentChannelName = "fsg423";
  //    const targetChannelName = "aewawe3";
  //    const currentComponent = new Horpyna.Component();
  //    const targetComponent = new Horpyna.Component();
  //    targetComponent.createInputChannel(targetChannelName);
  //    expect(currentComponent.createJoint.bind(currentComponent, targetComponent, currentChannelName, targetChannelName)).to.throw(Error, Error.NON_EXIST_CHANNEL);
  //    done();
  //  });
  //
  //  it("should throw error when two channels have joint already", done => {
  //    const currentChannelName = "fsg423";
  //    const targetChannelName = "aewawe3";
  //    const currentComponent = new Horpyna.Component();
  //    currentComponent.createOutputChannel(currentChannelName);
  //    const targetComponent = new Horpyna.Component();
  //    targetComponent.createInputChannel(targetChannelName);
  //    currentComponent.createJoint(targetComponent, currentChannelName, targetChannelName);
  //    expect(currentComponent.createJoint.bind(currentComponent, targetComponent, currentChannelName, targetChannelName)).to.throw(Error, Error.ONE_JOINT_PER_CHANNEL_PAIR);
  //    done();
  //  });
  //});
  //
  //describe("addCallback method", () => {
  //  it("in `next` method should trigger callback with default channel", done => {
  //    const component = new Horpyna.Component();
  //    const joint = component.addCallback((value, sourceChannel) => {
  //      expect(value).to.be.equal(dummyValue);
  //      expect(sourceChannel).to.be.an.instanceof(Horpyna.OutputChannel);
  //      expect(sourceChannel.getName()).to.be.equal(Horpyna.CHANNEL.DEFAULT_CHANNEL);
  //      done();
  //    }, Horpyna.CHANNEL.DEFAULT_CHANNEL);
  //    component.runSetInput(dummyValue);
  //    expect(joint).to.be.an.instanceof(Horpyna.Joint);
  //  });
  //
  //  it("in `next` method should trigger callback with custom channel", done => {
  //    const currentChannelName = "fsg423";
  //    const nextStub = sinon.stub(Horpyna.Component.prototype, "onNext", (request, response) => {
  //      response.send(request.getValue(), currentChannelName);
  //      nextStub.restore();
  //    });
  //    const component = new Horpyna.Component();
  //    component.createOutputChannel(currentChannelName);
  //    const joint =  component.addCallback((value, sourceChannel) => {
  //      expect(value).to.be.equal(dummyValue);
  //      expect(sourceChannel).to.be.an.instanceof(Horpyna.OutputChannel);
  //      expect(sourceChannel.getName()).to.be.equal(currentChannelName);
  //      done();
  //    }, currentChannelName);
  //
  //    component.runSetInput(dummyValue);
  //    expect(joint).to.be.an.instanceof(Horpyna.Joint);
  //  });
  //
  //  it("should throw error when current channel non exist", done => {
  //    const currentChannelName = "fsg423";
  //    const component = new Horpyna.Component();
  //    expect(component.addCallback.bind(component, () => {}, currentChannelName)).to.throw(Error, Error.NON_EXIST_CHANNEL);
  //    done();
  //  });
  //});
});
