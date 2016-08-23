import sinon from "sinon";
import chai from "chai";
import chaiThings from "chai-things";
import Horpyna from "../../dist/index";

chai.use(chaiThings);
const expect = chai.expect;

describe("Basic functionality", () => {
  let dummyValue = "BBBB";

  describe("Check basic single block", () => {
    it("should trigger overridden onNext: target channel default, response channel default", done => {
      let spyCustomFunc = sinon.spy();
      let component = new class extends Horpyna.Component {
        onNext(request, response) {
          spyCustomFunc();
          response.send(request.getValue());
        }
      };
      component.setInput(dummyValue);
      component.addCallback((value, sourceChannel) => {
        expect(spyCustomFunc.calledOnce).to.be.true;
        expect(value).to.be.equal(dummyValue);
        expect(sourceChannel).to.be.an.instanceof(Horpyna.OutputChannel);
        expect(sourceChannel.getName()).to.be.equal(Horpyna.CHANNEL.DEFAULT_CHANNEL);
        done();
      });
    });

    it("should trigger overridden onNext: target channel custom, response channel custom", done => {
      let targetChannelName = "AAAA";
      let responseChannelName = "BBBB";
      let spyCustomFunc = sinon.spy();
      let component = new class extends Horpyna.Component {
        onNext(request, response) {
          spyCustomFunc();
          expect(request.getTarget().getName()).to.be.equal(targetChannelName);
          response.send(request.getValue(), responseChannelName);
        }
      };
      component.createInputChannel(targetChannelName);
      component.createOutputChannel(responseChannelName);
      component.setInput(dummyValue, targetChannelName);
      component.addCallback((value, sourceChannel) => {
        expect(spyCustomFunc.calledOnce).to.be.true;
        expect(value).to.be.equal(dummyValue);
        expect(sourceChannel).to.be.an.instanceof(Horpyna.OutputChannel);
        expect(sourceChannel.getName()).to.be.equal(responseChannelName);
        done();
      }, responseChannelName);
    });
  });

  describe("Check block connection", () => {
    it("should get response from second component using default channels", done => {
      let spyParentFunc = sinon.spy();
      let spyChildFunc = sinon.spy();
      let parentComponent = new class extends Horpyna.Component {
        onNext(request, response) {
          spyParentFunc();
          response.send(request.getValue());
        }
      };
      let childComponent = new class extends Horpyna.Component {
        onNext(request, response) {
          spyChildFunc();
          response.send(request.getValue());
        }
      };
      parentComponent.setInput(dummyValue);
      parentComponent.addJoint(childComponent);
      childComponent.addCallback((value, sourceChannel) => {
        expect(spyParentFunc.calledOnce).to.be.true;
        expect(spyChildFunc.calledOnce).to.be.true;
        expect(spyParentFunc.calledBefore(spyChildFunc)).to.be.true;
        expect(value).to.be.equal(dummyValue);
        expect(sourceChannel).to.be.an.instanceof(Horpyna.OutputChannel);
        expect(sourceChannel.getName()).to.be.equal(Horpyna.CHANNEL.DEFAULT_CHANNEL);
        done();
      });
    })
  });

  describe("Check branched connection cA joint CB1 and CB2; CB1 joint CC; CB2 joint CC", () => {
    it("should invoke twice next method in the CC component", done => {
      let spyFirst = sinon.spy();
      let spySecondA = sinon.spy();
      let spySecondB = sinon.spy();
      let spyThird = sinon.spy();
      let firstComponent = new class extends Horpyna.Component {
        onNext(request, response) {
          spyFirst();
          response.send(request.getValue());
        }
      };
      firstComponent.setInput(dummyValue);
      let secondAComponent = new class extends Horpyna.Component {
        onNext(request, response) {
          spySecondA();
          response.send(request.getValue());
        }
      };
      let secondBComponent = new class extends Horpyna.Component {
        onNext(request, response) {
          spySecondB();
          response.send(request.getValue());
        }
      };
      let calls = 0;
      let thirdComponent = new class extends Horpyna.Component {
        onNext(request, response) {
          spyThird();
          calls ++;
          if(calls === 2) {
            response.send(request.getValue());
          }
        }
      };
      firstComponent.addJoint(secondAComponent);
      firstComponent.addJoint(secondBComponent);
      secondAComponent.addJoint(thirdComponent);
      secondBComponent.addJoint(thirdComponent);
      thirdComponent.addCallback((value, sourceChannel) => {
        expect(spyFirst.calledOnce).to.be.true;
        expect(spySecondA.calledOnce).to.be.true;
        expect(spySecondB.calledOnce).to.be.true;
        expect(spyThird.calledTwice).to.be.true;
        expect(spyThird.calledAfter(spySecondA)).to.be.true;
        expect(spyThird.calledAfter(spySecondB)).to.be.true;
        expect(spySecondA.calledAfter(spyFirst)).to.be.true;
        expect(spySecondB.calledAfter(spyFirst)).to.be.true;
        expect(value).to.be.equal(dummyValue);
        expect(sourceChannel).to.be.an.instanceof(Horpyna.OutputChannel);
        expect(sourceChannel.getName()).to.be.equal(Horpyna.CHANNEL.DEFAULT_CHANNEL);
        done();
      });

    });
  });
});
