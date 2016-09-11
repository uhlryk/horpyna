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

    let structure;
    let sourceComponentName = "sourceComponent";
    let sourceChannelName = "sourceChannel";
    let targetComponentName = "targetComponent";
    let targetChannelName = "targetChannel";
    before(done => {
      structure = new Horpyna.Structure();
      structure.createComponent(sourceComponentName, Horpyna.Component)
        .createOutputChannel(sourceChannelName);
      structure.createComponent(targetComponentName, Horpyna.Component)
        .createInputChannel(targetChannelName);
      done();
    });

    it("should create and get joint without options", done => {
      const jointName = "jointName";
      structure.createJoint(jointName, sourceComponentName, sourceChannelName, targetComponentName, targetChannelName);
      const joint = structure.getJoint(jointName);
      expect(joint).to.be.instanceof(Horpyna.Joint);
      const sourceChannel = joint.getSource();
      const targetChannel = joint.getTarget();
      expect(sourceChannel.getName()).to.be.equal(sourceChannelName);
      expect(targetChannel.getName()).to.be.equal(targetChannelName);
      done();
    });
  });
});
