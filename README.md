# HORPYNA
[![Build Status](https://travis-ci.org/uhlryk/horpyna.svg)](https://travis-ci.org/uhlryk/horpyna)
[![Downloads](https://img.shields.io/npm/dt/horpyna.svg)](https://www.npmjs.com/package/horpyna)
[![Downloads](https://img.shields.io/npm/dm/horpyna.svg)](https://www.npmjs.com/package/horpyna)
[![NPM version](https://img.shields.io/npm/v/horpyna.svg)](https://www.npmjs.com/package/horpyna)

## DESCRIPTION

This module is for better organizing chain processes with multiple branches.
It allows to design process flow by creating branches and setting conditions when 
they should be called. 

Main use case is to create flow template and reuse it with setting concrete functions instead of template ones.

Main unit is a Branch. Each branch accepts condition function and action function. 
Also each branch can accept other branches. 

## API

### Horpyna(options: Object): branch

Creates new branches.

#### options

```
{
    condition: Function,
    action: Function,
    branches: Object
}
```

 * condition - function with condition to test
 * action - function to call if condition pass
 * branches - object where key is branch name and value a subbranch.
 
#### example

```javascript
import Horpyna from "Horpyna";
const mainBranch = Horpyna({ 
    condition: value => value > 10, 
    action:  value => value + 1,
    branches: {
        maxBranch: Horpyna({
            condition: value => value >= 15,
            action: value => 15
        })
    }
});
mainBranch(10)
    .then(console.log)//null
mainBranch(11)
    .then(console.log)//12
mainBranch(15)
    .then(console.log)//15
```

### branch.changeCondition(condition: (value: any) => result: any): branch

Changes branch condition. Returns new branch with new condition.

#### example
```javascript
import Horpyna from "Horpyna";
const mainBranch = Horpyna({ 
    condition: value => value > 10, 
    action:  value => value + 1,
});
const newMainBranch = mainBranch.changeCondition(value => value > 11);

mainBranch(11)
    .then(console.log)//12

newMainBranch(11)
    .then(console.log)//null
```

### branch.changeAction(action: (value: any) => result: any): branch

Changes branch action. Returns new branch with new action.

#### example
```javascript
import Horpyna from "Horpyna";
const mainBranch = Horpyna({ 
    condition: value => value > 10, 
    action:  value => value + 1,
});
const newMainBranch = mainBranch.changeAction(value => value + 2);

mainBranch(11)
    .then(console.log)//12

newMainBranch(11)
    .then(console.log)//13
```

### branch.addBranch(branchName: String, subBranch: branch): branch

Adds additional branch to existing one

#### example
```javascript
import Horpyna from "Horpyna";
const mainBranch = Horpyna({ 
    condition: value => value > 10, 
    action:  value => value + 1,
    branches: {
        maxBranch: Horpyna({
            condition: value => value >= 15,
            action: value => 15
        })
    }
});
const newMainBranch = mainBranch.addBranch("minBranch", Horpyna({
    condition: value => value < 15,
    action: value => value
}));
mainBranch(10)
    .then(console.log)//null
newMainBranch(10)
    .then(console.log)//11
```

### branch,getBranch(branchName: String, deepBranch = true): branch

Returns first branch by name. If deepBranch argument is true it will search in all branch tree beginning from this branch.

#### example
```javascript
import Horpyna from "Horpyna";
const mainBranch = Horpyna({ 
    condition: value => value > 10, 
    action:  value => value + 1,
    branches: {
        maxBranch: Horpyna({
            condition: value => value >= 15,
            action: value => 15
        })
    }
});
const maxBranch = mainBranch.getBranch("maxBranch");

maxBranch(14)
    .then(console.log)//null
maxBranch(20)
    .then(console.log)//15
```

### branch(input): promise

Returns promise resolvable to calculated output.

#### example
```javascript
import Horpyna from "Horpyna";
const mainBranch = Horpyna({ 
    condition: value => value > 10, 
    action:  value => value + 1,
});

mainBranch(11)
    .then(console.log)//12
```

## LICENSE

MIT



