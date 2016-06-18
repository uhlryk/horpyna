# HORPYNA
[![Build Status](https://travis-ci.org/uhlryk/horpyna.svg)](https://travis-ci.org/uhlryk/horpyna)
[![Downloads](https://img.shields.io/npm/dt/horpyna.svg)](https://www.npmjs.com/package/horpyna)
[![Downloads](https://img.shields.io/npm/dm/horpyna.svg)](https://www.npmjs.com/package/horpyna)
[![NPM version](https://img.shields.io/npm/v/horpyna.svg)](https://www.npmjs.com/package/horpyna)

## SHORT DESCRIPTION

This module is for better organizing multiple async processes.
If you have:

 * big amount async functions 
 * some of them run only if some conditions meet 
 * some of them run multiple times 
 * you are bored of long promise chains with inner conditional sub chains
 * you want to reuse some parts of promise chains
 
Then this library is for your project!

It helps with modularity, reusability and testify of your code.
 
## HOW DOES IT WORKS

You split your code into smaller independent parts. Each of them you wrap into Horpyna Component. You customize
each component. And then it is funniest part. You can join components together, then built new components from 
joined components. You can decorate components with other components to modify it functionality. 

For example you can have component which consist of 5 other components. You can reuse it, and remove some inner components
and replace them with other components.

It is also easy to test. Each component have input and output. In test you set different input data and test
 output values.


## INSTALLATION

    npm install horpyna
    
## USAGE 
*in ES6 syntax but you can use it with ES5 too*

[todo]

## LICENSE

MIT



