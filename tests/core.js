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

    it("should resolve promise when function logic is in constructor", (done) => {
      let spyComponent = sinon.spy();
      let spyCustomFunc = sinon.spy();
      let component = new Horpyna.Component((request, response) => {
        spyCustomFunc();
        response.finish();
      });
      let promise = component.run();
      promise.then(() => {
        spyComponent();
        expect(spyComponent.calledOnce).to.be.true;
        expect(spyCustomFunc.calledOnce).to.be.true;
        expect(spyCustomFunc.calledBefore(spyComponent)).to.be.true;
        done();
      });
    });

    it("should resolve promise when function logic is as extend class method", (done) => {
      let spyComponent = sinon.spy();
      let spyCustomFunc = sinon.spy();
      let ExtendComponent = class extends Horpyna.Component {
        componentFunction(request, response) {
          spyCustomFunc();
          response.finish();
        }
      };
      let component = new ExtendComponent();
      let promise = component.run();
      promise.then(() => {
        spyComponent();
        expect(spyComponent.calledOnce).to.be.true;
        expect(spyCustomFunc.calledOnce).to.be.true;
        expect(spyCustomFunc.calledBefore(spyComponent)).to.be.true;
        done();
      });
    });

    it("should throw error if component doesn't have function logic", (done) => {
      let component = new Horpyna.Component();
      let promise = component.run();
      promise.catch(e => {
        expect(e).to.be.deep.equal(new Error());
        done();
      });
    });


    it("should return value to child component", (done) => {
      const RESPONSE = "1234456564";
      let componentA = new Horpyna.Component((request, response) => {
        response.send(request.input);
      });
      let componentB = new Horpyna.Component((request, response) => {
        expect(request.input).to.be.equal(RESPONSE);
        response.finish();
        done();
      });
      componentB.bind(componentA);
      componentA.run(RESPONSE);
    })
  });

  describe("Check chain components", () => {
    it("should return promise in run method and resolve it", (done) => {
      let spyA = sinon.spy();
      let spyB = sinon.spy();
      let spyC = sinon.spy();
      let spyComponent = sinon.spy();
      let componentA = new Horpyna.Component((request, response) => {
        setTimeout(() => {
          spyA();
          response.send();
        }, 30);
      });
      let componentB = new Horpyna.Component((request, response) => {
        setTimeout(() => {
          spyB();
          response.send();
        }, 20);
      });
      let componentC = new Horpyna.Component((request, response) => {
        setTimeout(() => {
          spyC();
          response.finish();
        }, 10);
      });
      componentB.bind(componentA);
      componentC.bind(componentB);
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
      let spyA = sinon.spy();
      let spyB = sinon.spy();
      let spyC = sinon.spy();
      let spyD = sinon.spy();
      let spyComponent = sinon.spy();
      let componentA = new Horpyna.Component((request, response) => {
        setTimeout(() => {
          spyA();
          response.send();
        }, 50);
      });
      let componentB = new Horpyna.Component((request, response) => {
        setTimeout(() => {
          spyB();
          response.send();
        }, 40);
      });
      let componentC = new Horpyna.Component((request, response) => {
        setTimeout(() => {
          spyC();
          response.send();
        }, 30)

      });
      let componentD = new Horpyna.Component((request, response) => {
        setTimeout(() => {
          spyD();
          response.finish();
        }, 20);
      });
      componentB.bind(componentA);
      componentC.bind(componentA);
      componentD.bind(componentB);
      componentD.bind(componentC);
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
