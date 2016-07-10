import sinon from "sinon";
import chai from "chai";
import chaiThings from "chai-things";
import Horpyna from "../src/index";

chai.use(chaiThings);
const expect = chai.expect;

const TEST_MESSAGE_A = "messageA";
const TEST_MESSAGE_B = "messageB";

describe("Basic functionality", () => {

  describe("Check basic single block", () => {

    it("should finish chain when process function is constructor argument", done => {
      let spyComponent = sinon.spy();
      let spyCustomFunc = sinon.spy();
      let component = new class extends Horpyna.Component {
        onProcess(request, response) {
          spyCustomFunc();
          response.send(TEST_MESSAGE_A);
        }
      };
      component.final();
      component.run(null, channelList => {
        spyComponent();
        expect(spyComponent.calledOnce).to.be.true;
        expect(spyCustomFunc.calledOnce).to.be.true;
        expect(spyCustomFunc.calledBefore(spyComponent)).to.be.true;
        expect(channelList[0].output).to.be.equal(TEST_MESSAGE_A);
        done();
      });
    });

    it("should pass options to onInit", done => {
      let Component =  class extends Horpyna.Component {
        onInit(options) {
          expect(options).to.be.equal(TEST_MESSAGE_A);
          done();
        }
      };
      new Component(TEST_MESSAGE_A);
    });

    it("should output last response from response.prepare", done => {
      let spyComponent = sinon.spy();
      let spyCustomFunc = sinon.spy();
      let component = new class extends Horpyna.Component {
        onProcess(request, response) {
          spyCustomFunc();
          response.prepare(TEST_MESSAGE_A);
          response.prepare(TEST_MESSAGE_B);
          response.done();
        }
      };
      component.final();
      component.run(null, channelList => {
        spyComponent();
        expect(spyComponent.calledOnce).to.be.true;
        expect(spyCustomFunc.calledOnce).to.be.true;
        expect(spyCustomFunc.calledBefore(spyComponent)).to.be.true;
        expect(channelList[0].output).to.be.equal(TEST_MESSAGE_B);
        done();
      });
    });

    it("should output response from first channel list and response is single element array", done => {
      let component = new Horpyna.Component();
      component.final();
      component.run(TEST_MESSAGE_A, channelList => {
        expect(channelList.length).to.be.equal(1);
        expect(channelList[0].output.length).to.be.equal(1);
        expect(channelList[0].output[0]).to.be.equal(TEST_MESSAGE_A);
        done();
      });
    });


    it("should return value to child component", done => {
      let componentA = new class extends Horpyna.Component {
        onProcess(request, response) {
          response.send(request.input[0]);
        }
      };
      let componentB = new class extends Horpyna.Component {
        onProcess(request, response) {
          expect(request.input[0]).to.be.equal(TEST_MESSAGE_A);
          response.send();
          done();
        }
      };
      componentB.final();
      componentB.bind(componentA);
      componentA.run(TEST_MESSAGE_A);
    });

    it("next component should have request object with string input and count 1 if one parent send response", done => {
      let componentParent = new class extends Horpyna.Component {
        onProcess(request, response) {
          response.send(TEST_MESSAGE_A);
        }
      };
      let component = new class extends Horpyna.Component {
        onProcess(request, response) {
          expect(request.input[0]).to.be.equal(TEST_MESSAGE_A);
          expect(request.input.length).to.be.equal(1);
          done();
        }
      };
      component.bind(componentParent);
      componentParent.run();
    });


    it("next component should have request object with string array input and count 2 if one parent send response", done => {
      let componentGrandParent = new class extends Horpyna.Component {
        onProcess(request, response) {
          response.send();
        }
      };
      let componentParentA = new class extends Horpyna.Component {
        onProcess(request, response) {
          response.send(TEST_MESSAGE_A);
        }
      };
      let componentParentB = new class extends Horpyna.Component {
        onProcess(request, response) {
          response.send(TEST_MESSAGE_B);
        }
      };
      let component = new class extends Horpyna.Component {
        onProcess(request, response) {
          expect(request.input.length).to.be.equal(2);
          done();
        }
      };
      componentParentA.bind(componentGrandParent);
      componentParentB.bind(componentGrandParent);
      component.bind(componentParentA);
      component.bind(componentParentB);
      componentGrandParent.run();
    });

  });

  describe("Check chain components", () => {
    it("should return promise in run method and resolve it", done => {
      let spyA = sinon.spy();
      let spyB = sinon.spy();
      let spyC = sinon.spy();
      let spyComponent = sinon.spy();
      let componentA = new class extends Horpyna.Component {
        onProcess(request, response) {
          setTimeout(() => {
            spyA();
            response.send();
          }, 30);
        }
      };
      let componentB = new class extends Horpyna.Component {
        onProcess(request, response) {
          setTimeout(() => {
            spyB();
            response.send();
          }, 20);
        }
      };
      let componentC = new class extends Horpyna.Component {
        onProcess(request, response) {
          setTimeout(() => {
            spyC();
            response.send();
          }, 10);
        }
      };
      componentC.final();
      componentB.bind(componentA);
      componentC.bind(componentB);
      componentA.run(null, output => {
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
      let componentA = new class extends Horpyna.Component {
        onProcess(request, response) {
          setTimeout(() => {
            spyA();
            response.send();
          }, 50);
        }
      };
      let componentB = new class extends Horpyna.Component {
        onProcess(request, response) {
          setTimeout(() => {
            spyB();
            response.send();
          }, 40);
        }
      };
      let componentC = new class extends Horpyna.Component {
        onProcess(request, response) {
          setTimeout(() => {
            spyC();
            response.send();
          }, 30)
        }
      };
      let componentD = new class extends Horpyna.Component {
        onProcess(request, response) {
          setTimeout(() => {
            spyD();
            response.send();
          }, 20);
        }
      };
      componentD.final();
      componentB.bind(componentA);
      componentC.bind(componentA);
      componentD.bind(componentB);
      componentD.bind(componentC);
      componentA.run(null, output => {
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
    it("should return message to final component connected by custom channel", done => {
      let spyA = sinon.spy();
      let spyB = sinon.spy();

      const CHANNEL_AA = "channelAA";
      let componentA = new class extends Horpyna.Component {
        onProcess(request, response) {
          spyA();
          response.send(TEST_MESSAGE_A, CHANNEL_AA);
        }
      };
      componentA.createChannel(CHANNEL_AA);
      let componentB = new class extends Horpyna.Component {
        onProcess(request, response) {
          spyB();
          expect(request.input[0]).to.be.equal(TEST_MESSAGE_A);
          response.send();
        }
      };

      componentB.bind(componentA, CHANNEL_AA);
      componentB.final();

      componentA.run(null, otput => {
        expect(spyA.calledOnce).to.be.true;
        expect(spyB.calledOnce).to.be.true;
        expect(spyA.calledBefore(spyB)).to.be.true;
        done();
      });
    });

  });

  describe("Custom structures", () => {
    const CHANNEL_AA = "channelAA";
    const CHANNEL_AB = "channelAB";
    it("should finish", done => {
      let spyAA = sinon.spy();
      let spyAB = sinon.spy();
      let spyB = sinon.spy();
      let spyC = sinon.spy();
      let componentA = new class extends Horpyna.Component {
        onProcess(request, response) {
          if (request.input[0]) {
            spyAB();
            response.send(null, CHANNEL_AB);
          } else {
            spyAA();
            response.send(null, CHANNEL_AA);
          }
        }
      };
      componentA.createChannel(CHANNEL_AA);
      componentA.createChannel(CHANNEL_AB);
      let componentB = new class extends Horpyna.Component {
        onProcess(request, response) {
          spyB();
          response.send(true);
        }
      };
      componentB.bind(componentA, CHANNEL_AA);
      componentA.bind(componentB);

      let componentC = new class extends Horpyna.Component {
        onProcess(request, response) {
          spyC();
          response.send();
        }
      };
      componentC.bind(componentA, CHANNEL_AB);
      componentC.final();
      componentA.run(null, output => {
        expect(spyAA.calledOnce).to.be.true;
        expect(spyAB.calledOnce).to.be.true;
        expect(spyB.calledOnce).to.be.true;
        expect(spyC.calledOnce).to.be.true;
        expect(spyAA.calledBefore(spyAB)).to.be.true;
        expect(spyAA.calledBefore(spyB)).to.be.true;
        expect(spyB.calledBefore(spyAB)).to.be.true;
        expect(spyAB.calledBefore(spyC)).to.be.true;
        done();
      });
    })
  });
});
