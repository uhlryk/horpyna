import sinon from "sinon";
import chai from "chai";
import chaiThings from "chai-things";
import Horpyna from "../../dist/index";

chai.use(chaiThings);
const expect = chai.expect;

describe("Joint", () => {
  const mockSourceChannel = new Horpyna.Channel("1234567890");
  const mockTargetChannel = new Horpyna.Channel("2345678901");
  const jointName = "jointName";
  const joint = new Horpyna.Joint(jointName, mockSourceChannel, mockTargetChannel);

  describe("getSource method", () => {

    it("should return source channel", done => {
      expect(joint.getSource()).to.be.equal(mockSourceChannel);
      done();
    });
  });

  describe("getTarget method", () => {

    it("should return target channel", done => {
      expect(joint.getTarget()).to.be.equal(mockTargetChannel);
      done();
    });
  });

  describe("getName method", () => {

    it("should return joint name", done => {
      expect(joint.getName()).to.be.equal(jointName);
      done();
    });
  });
});
