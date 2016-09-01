# HORPYNA
[![Build Status](https://travis-ci.org/uhlryk/horpyna.svg)](https://travis-ci.org/uhlryk/horpyna)
[![Downloads](https://img.shields.io/npm/dt/horpyna.svg)](https://www.npmjs.com/package/horpyna)
[![Downloads](https://img.shields.io/npm/dm/horpyna.svg)](https://www.npmjs.com/package/horpyna)
[![NPM version](https://img.shields.io/npm/v/horpyna.svg)](https://www.npmjs.com/package/horpyna)

## SHORT DESCRIPTION

This module is for better organizing multiple async processes.
If you have:

 * big amount async functions 
 * some of them start only if some conditions meet 
 * some of them start multiple times 
 * you are bored of long promise chains with inner conditional sub chains
 * you want to reuse some parts of promise chains
 
Then this library is for your project!

It helps with modularity, reusability and testify of your code.
 
## HOW DOES IT WORKS

You split your code into smaller independent parts. Each of them you wrap into Horpyna Component. You customize
each component. And then it is funniest part. You can join components together, then built new components from 
joined components. You can decorate components with other components to modify its functionality. 

For example you can have component which consist of 5 other components. You can reuse it, and remove some inner components
and replace them with other components.

It is also easy to test. Each component has input and output. In test you set different input value and test
 output values.

Each component has input and output channels. By default components have default and error channel.
Each input channel can be connected with any number of output channels from other components.

## INSTALLATION

    npm install horpyna

## USAGE 
*in ES6 syntax but you can use it with ES5 too*

### EXTENDING COMPONENT

*You have to separate your code into smallest code blocks, then create new classes which extending from Horpyna.Component
and put in each class your code block*


    import Horpyna from "horpyna"; 
    
    class CustomComponent1 extends Horpyna.Component {
    
      onInit() {
        //custom configuration, for example creation of additional channels
      }
      onNext(request, response) {
        //input value is available from request.value
        //when component finish calculating response send it via response.send(componentResponse)
      }
      
    }
    
    export default CustomComponent1;

YOU SHOULD BUILD COMPONENTS WITH OPTIONS WHICH SHOULD ALLOW YOUR COMPONENTS TO BE FLEXIBLE,
GREAT IDEA IS TO TREAT SOME PARAMS FROM PARENT COMPONENTS AS OPTIONS WHICH CHANGING COMPONENT BEHAVIOR,

if you wish create your components `inline` :

    let CustomComponent1 = class extends Horpyna.Component {
      onInit() { ... }
      onNext(request, response) { ... }
    }
    
or even create instances from inline classes

    let customComponent1 = new class extends Horpyna.Component {
      onInit() { ... }
      onNext(request, response) { ... }
    }


### BUILDING COMPONENT CHAINS
    
*Your work consists of two parts: create components, create components chains based on your components (or use external components)*

Let assume that we have few components:
And we want to validate incoming value, 
if value is wrong then send error message, 
if value is  ok then use it to take users from db,
If there is no users then send error message
If there is one user make some calculation.
If there are many users calculate something else.
    
    import ValidateParams from "validateParams";
    import getEnityFromDb from "GetEnityFromDb";
    import CalculateSomething from "calculateSomething";
    import SendResponse from "sendResponse";
    
    const validateParamsComponent = new ValidateParams();
    validateParamsComponent.setInput(startParameters);
    const validateErrorMessageComponent = new SendResponse(options);
    validateParamsComponent.createJoint(validateErrorMessageComponent, "customErrorChannel");
    
    const getUserList = new GetEntityFromDb(options);
    validateParamsComponent.createJoint(getUserList);
    
    const zeroUsersErrorMessageComponent = new SendResponse(options);
    getUserList.createJoint(zeroUsersErrorMessageComponent, "otherCustomErrorChannel");
    
    const calculateWhenOneEntity = new CalculateSomething(options);
    getUserList.createJoint(calculateWhenOneEntity, "oneEntityChannel");
    
    const calculateWhenManyEntities = new CalculateSomething(options);
    getUserList.createJoint(calculateWhenManyEntities, "manyEntitiesChannel");
    
    getUserList.addCallback((value, channel) => {
      //callback when getUserList finished calculation
    });
    

You can create one component which will contain this component chain. And you can easy build new component chains
based on simple components or complex components.

[todo: example of complex component chain]

[todo: use complex components and unbinding from it some subcomponents]

## API

## DEVELOPMENT

### COMMANDS 

If you wish to help with this module, below there are instructions.
   
Run production build:

    npm run build
    
Run tests (they run build before):

    npm test


### RULES

 1. New functionality should be coveraged by tests. Tests are in tests directory
 
 2. When you finished, run build `npm run build` (repository also storage build)
 
## LICENSE

MIT



