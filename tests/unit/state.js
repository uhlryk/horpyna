import sinon from "sinon";
import chai from "chai";
import chaiThings from "chai-things";
import Horpyna from "../../dist/index";

chai.use(chaiThings);
const expect = chai.expect;

describe("State", () => {
  const dummyValue1 = "123456789";
  const dummyValue2 = "234567890";
  const state = new Horpyna.State(dummyValue1);

  describe("getState method", () => {
    it("should return value", done => {
      expect(state.getState()).to.be.equal(dummyValue1);
      done();
    });
  });

  describe("setState method", () => {
    it("should save value", done => {
      state.setState(dummyValue2);
      expect(state.getState()).to.be.equal(dummyValue2);
      done();
    });
  });

  describe("clearState method", () => {
    it("should clear value", done => {
      state.clearState();
      expect(state.getState()).to.be.null;
      done();
    });
  });
});
