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

  })
  ;
});
