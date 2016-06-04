import chai from "chai";
import chaiThings from "chai-things";
import chaiAsPromised from "chai-as-promised";
import Promise from "bluebird";
import Horpyna from "../src/index";

chai.use(chaiThings);
chai.use(chaiAsPromised);
const expect = chai.expect;



describe("Basic functionality", () => {

  describe("Check basic single block", () => {

    it("should return promise in run method and resolve it", () => {
      let component = new Horpyna.Component();
      let promise = component.run();
      expect(promise).to.be.instanceof(Promise);
      expect(promise).to.eventually.be.fulfilled;
    });

    it("should resolve promise in custom function from constructor and return resolved value", () => {
      const RESOLVE_VALUE = "1234567";
      let component = new Horpyna.Component(resolve => {
        resolve(RESOLVE_VALUE);
      });
      let promise = component.run();
      expect(promise).to.be.instanceof(Promise);
      expect(promise).to.eventually.be.fulfilled;
      expect(promise).to.eventually.equal(RESOLVE_VALUE);
    })

    it("should reject promise in custom function from constructor", () => {
      const RESOLVE_VALUE = "1234567";
      let component = new Horpyna.Component((resolve, reject) => {
        reject();
      });
      let promise = component.run();
      expect(promise).to.be.instanceof(Promise);
      expect(promise).to.eventually.be.rejected;
    })

  })
  ;
});
