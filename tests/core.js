import sinon from "sinon";
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

    it("should resolve promise in custom function from constructor and return resolved value", (done) => {
      var spyComponent = sinon.spy();
      var spyCustomFunc = sinon.spy();
      let component = new Horpyna.Component((input, output) => {
        spyCustomFunc();
        output();
      });
      let promise = component.run();
      promise.then((response) => {
        spyComponent();
        expect(spyComponent.calledOnce).to.be.true;
        expect(spyCustomFunc.calledOnce).to.be.true;
        expect(spyCustomFunc.calledBefore(spyComponent)).to.be.true;
        done();
      });
    })

  });

  describe("Check blocks in line", () => {
    it("should return promise in run method and resolve it", (done) => {
      var spyA = sinon.spy();
      var spyB = sinon.spy();
      var spyC = sinon.spy();
      var spyComponent = sinon.spy();
      let componentA = new Horpyna.Component((input, output) => {
        spyA();
        output();
      });
      let componentB = new Horpyna.Component((input, output) => {
        spyB();
        output();
      });
      let componentC = new Horpyna.Component((input, output) => {
        spyC();
        output();
      });
      componentB.connect(componentA);
      componentC.connect(componentB);
      let promise = componentA.run();
      promise.then((response) => {
        spyComponent();
        expect(spyA.calledOnce).to.be.true;
        expect(spyB.calledOnce).to.be.true;
        expect(spyC.calledOnce).to.be.true;
        expect(spyA.calledBefore(spyB)).to.be.true;
        expect(spyB.calledBefore(spyC)).to.be.true;
        expect(spyC.calledBefore(spyComponent)).to.be.true;
        done();
      });

    });

  });
});
