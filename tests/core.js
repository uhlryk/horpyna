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

    it("should resolve promise in custom function from constructor", (done) => {
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
    it("should return value to child component", (done) => {
      const RESPONSE = "1234456564";
      let componentA = new Horpyna.Component();
      let componentB = new Horpyna.Component((input, output) => {
        expect(input).to.be.equal(RESPONSE);
        done();
        output();
      });
      componentB.connect(componentA);
      componentA.run(RESPONSE);
    })
    it("should return value to child component in custom function from constructor", (done) => {
      const RESPONSE = "1234456564";
      let componentA = new Horpyna.Component((input, output) => {
        output(input);
      });
      let componentB = new Horpyna.Component((input, output) => {
        expect(input).to.be.equal(RESPONSE);
        done();
        output();
      });
      componentB.connect(componentA);
      componentA.run(RESPONSE);
    })
  });

  describe("Check chain components", () => {
    it("should return promise in run method and resolve it", (done) => {
      var spyA = sinon.spy();
      var spyB = sinon.spy();
      var spyC = sinon.spy();
      var spyComponent = sinon.spy();
      let componentA = new Horpyna.Component((input, output) => {
        setTimeout(() => {
          spyA();
          output();
        }, 30);
      });
      let componentB = new Horpyna.Component((input, output) => {
        setTimeout(() => {
          spyB();
          output();
        }, 20);
      });
      let componentC = new Horpyna.Component((input, output) => {
        setTimeout(() => {
          spyC();
          output();
        }, 10);
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

  describe("Check branched components", () => {
    it("should return promise in run method and resolve it", (done) => {
      var spyA = sinon.spy();
      var spyB = sinon.spy();
      var spyC = sinon.spy();
      var spyD = sinon.spy();
      var spyComponent = sinon.spy();
      let componentA = new Horpyna.Component((input, output) => {
        setTimeout(() => {
          spyA();
          output();
        }, 50);
      });
      let componentB = new Horpyna.Component((input, output) => {
        setTimeout(() => {
          spyB();
          output();
        }, 40);
      });
      let componentC = new Horpyna.Component((input, output) => {
        setTimeout(() => {
          spyC();
          output();
        }, 30)

      });
      let componentD = new Horpyna.Component((input, output) => {
        setTimeout(() => {
          spyD();
          output();
        }, 20);
      });
      componentB.connect(componentA);
      componentC.connect(componentA);
      componentD.connect(componentB);
      componentD.connect(componentC);
      let promise = componentA.run();
      promise.then((response) => {
        spyComponent();
        expect(spyA.calledOnce).to.be.true;
        expect(spyB.calledOnce).to.be.true;
        expect(spyC.calledOnce).to.be.true;
        expect(spyD.calledOnce).to.be.true;
        expect(spyA.calledBefore(spyB)).to.be.true;
        expect(spyA.calledBefore(spyC)).to.be.true;
        expect(spyB.calledBefore(spyD)).to.be.true;
        expect(spyC.calledBefore(spyD)).to.be.true;
        expect(spyD.calledBefore(spyComponent)).to.be.true;
        done();
      });

    });

  });
});
