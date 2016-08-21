import sinon from "sinon";
import chai from "chai";
import chaiThings from "chai-things";
import Horpyna from "../../dist/index";

chai.use(chaiThings);
const expect = chai.expect;

describe("Request", () => {

  const mockValue = "123456789";
  const mockSourceChannel = {};
  const mockTargetChannel = {};

  const request = new Horpyna.Request(mockValue, mockSourceChannel, mockTargetChannel);

  describe("getValue method", () => {

    it("should return value", done => {
      expect(mockValue).to.be.equal(request.getValue());
      done();
    });
  });

  describe("getTarget method", () => {

    it("should return target channel", done => {
      expect(mockTargetChannel).to.be.equal(request.getTarget());
      done();
    });
  });

  describe("getSource method", () => {

    it("should return source channel", done => {
      expect(mockSourceChannel).to.be.equal(request.getSource());
      done();
    });
  });
});
