import sinon from "sinon";
import chai from "chai";
import chaiThings from "chai-things";
import chaiAsPromised from "chai-as-promised";
import Promise from "bluebird";
import Horpyna from "../src/index";

chai.use(chaiThings);
chai.use(chaiAsPromised);
const expect = chai.expect;

const TEST_MESSAGE_A = "messageA";
const TEST_MESSAGE_B = "messageB";

describe("Basic functionality", () => {

  describe("Check basic single block", () => {

    it("should resolve promise when function logic is in constructor", done => {
      let spyComponent = sinon.spy();
      let spyCustomFunc = sinon.spy();
      let component = new Horpyna.Component((request, response) => {
        spyCustomFunc();
        response.send(TEST_MESSAGE_A);
      });
      component.final();
      let promise = component.run();
      promise.then(output => {
        spyComponent();
        expect(spyComponent.calledOnce).to.be.true;
        expect(spyCustomFunc.calledOnce).to.be.true;
        expect(spyCustomFunc.calledBefore(spyComponent)).to.be.true;
        expect(output).to.be.equal(TEST_MESSAGE_A);
        done();
      });
    });

    it("should output last response from response.prepare", done => {
      let spyComponent = sinon.spy();
      let spyCustomFunc = sinon.spy();
      let component = new Horpyna.Component((request, response) => {
        spyCustomFunc();
        response.prepare(TEST_MESSAGE_A);
        response.prepare(TEST_MESSAGE_B);
        response.done();
      });
      component.final();
      let promise = component.run();
      promise.then(output => {
        spyComponent();
        expect(spyComponent.calledOnce).to.be.true;
        expect(spyCustomFunc.calledOnce).to.be.true;
        expect(spyCustomFunc.calledBefore(spyComponent)).to.be.true;
        expect(output).to.be.equal(TEST_MESSAGE_B);
        done();
      });
    });

    it("should resolve promise when function logic is as extend class method", done => {
      let spyComponent = sinon.spy();
      let spyCustomFunc = sinon.spy();
      let ExtendComponent = class extends Horpyna.Component {
        constructor() {
          super();
          this.final();
        }
        componentFunction(request, response) {
          spyCustomFunc();
          response.send(TEST_MESSAGE_A);
        }
      };
      let component = new ExtendComponent();
      let promise = component.run();
      promise.then(output => {
        spyComponent();
        expect(spyComponent.calledOnce).to.be.true;
        expect(spyCustomFunc.calledOnce).to.be.true;
        expect(spyCustomFunc.calledBefore(spyComponent)).to.be.true;
        expect(output).to.be.equal(TEST_MESSAGE_A);
        done();
      });
    });

    it("should throw error if component doesn't have function logic", done => {
      let component = new Horpyna.Component();
      let promise = component.run();
      promise.catch(e => {
        expect(e).to.be.deep.equal(new Error());
        done();
      });
    });


    it("should return value to child component", done => {
      let componentA = new Horpyna.Component((request, response) => {
        response.send(request.input);
      });
      let componentB = new Horpyna.Component((request, response) => {
        expect(request.input).to.be.equal(TEST_MESSAGE_A);
        response.send();
        done();
      });
      componentB.final();
      componentB.bind(componentA);
      componentA.run(TEST_MESSAGE_A);
    })
  });

  describe("Check chain components", () => {
    it("should return promise in run method and resolve it", done => {
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
          response.send();
        }, 10);
      });
      componentC.final();
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
    it("should return promise in run method and resolve it", done => {
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
          response.send();
        }, 20);
      });
      componentD.final();
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

  describe("Check channels", () => {
    it("should return message to final component connected by custom channel", (done) => {
      let spyA = sinon.spy();
      let spyB = sinon.spy();

      const CHANNEL_AA = "channelAA";
      let componentA = new Horpyna.Component((request, response) => {
        spyA();
        response.send(TEST_MESSAGE_A, CHANNEL_AA);
      });
      componentA.createChannel(CHANNEL_AA);
      let componentB = new Horpyna.Component((request, response) => {
        spyB();
        expect(request.input).to.be.equal(TEST_MESSAGE_A);
        response.send();
      });

      componentB.bind(componentA, CHANNEL_AA);
      componentB.final();

      let promise = componentA.run();
      promise.then((response) => {
        expect(spyA.calledOnce).to.be.true;
        expect(spyB.calledOnce).to.be.true;
        expect(spyA.calledBefore(spyB)).to.be.true;
        done();
      });
    });

  });


});
