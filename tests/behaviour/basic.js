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
      component.start(dummyValue);
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
      component.start(dummyValue, targetChannelName);
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
      parentComponent.start(dummyValue);
    })
  });
});
