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

## Use case

```
import { Branch} from "Horpyna";
const branch = new Branch({
    name: "branchName"
})
branch.execute(someInput)
    .then(response => console.log(response))
```
or

```
import { Branch} from "Horpyna";
const branch = Branch.create({
    name: "branchName"
})
branch.execute(someInput)
    .then(response => console.log(response))
```

## API


### new Branch(options: Object): branch

Creates new branch instance.

### Branch.create(options: Object): branch

Creates new branch instance.

#### options

```
{   name: String
    condition: Function,
    action: Function,
    branches: Array<Branch>,
    exceptionHandler: Bool
}
```

 * name - branch name
 * condition - function with condition to test. It can return promise.
 * action - function to call if condition pass. It can return promise.
 * branches - array of sub branches
 * exceptionHandler: boolean if true this branch will be only trigger to handle exceptions
 
#### example

```javascript
import { Branch } from "Horpyna";
const mainBranch = new Branch({ 
    name: "mainBranch",
    condition: value => value > 10, 
    action:  value => value + 1,
    branches: [{
        name: "maxBranch",
        condition: value => value >= 15,
        action: value => 15
    }]
});
mainBranch.execute(10)
    .then(console.log)//null
mainBranch.execute(11)
    .then(console.log)//12
mainBranch.execute(15)
    .then(console.log)//15
```


### branch.setCondition(condition: (value: any) => result: any): branch

Changes branch condition. Returns this branch instance.

#### example
```javascript
import { Branch } from "Horpyna";
const mainBranch = new Branch({ 
    name: "mainBranch",
    condition: value => value > 10, 
    action:  value => value + 1,
});
mainBranch.execute(11)
    .then(console.log)//12

mainBranch.setCondition(value => value > 11);

mainBranch.execute(11)
    .then(console.log)//null
```

### branch.setAction(action: (value: any) => result: any): branch

Changes/set branch action. Returns this branch instance.

#### example
```javascript
import { Branch } from "Horpyna";
const mainBranch = new Branch({ 
    name: "mainBranch",
    condition: value => value > 10, 
    action:  value => value + 1,
});

mainBranch.execute(11)
    .then(console.log)//12
    
mainBranch.setAction(value => value + 2);

mainBranch.execute(11)
    .then(console.log)//13
```

### branch.addBranch(branchName: String, subBranch: branch): branch

Adds additional branch to existing one. Returns this branch instance. 

#### example
```javascript
import { Branch } from "Horpyna";
const mainBranch = new Branch({ 
    name: "mainBranch",
    condition: value => value > 10, 
    action:  value => value + 1,
    branches: [{
        name: "maxBranch",
        condition: value => value >= 15,
        action: value => 15
    }]
});

mainBranch.execute(10)
    .then(console.log)//null
    
mainBranch.addBranch(new Branch({
    name: "minBranch",
    condition: value => value < 15,
    action: value => value
}));

mainBranch.execute(10)
    .then(console.log)//11
```

### branch,getBranch(branchName: String): branch

Returns first branch by name. If branch doesn't exist it will return null.

#### example
```javascript
import { Branch } from "Horpyna";
const mainBranch = new Branch({ 
    name: "mainBranch",
    condition: () => true,
    action: () => true,
    branches: [{
        name: "maxBranch",
        condition: () => true,
        action: () => true
    }]
});
const maxBranch = mainBranch.getBranch("maxBranch");
```

### branch,findBranch(branchName: String): branch

It will search in all branch tree beginning from current branch. If there is no such a branch it will return null.

#### example
```javascript
import { Branch } from "Horpyna";
const mainBranch = new Branch({ 
    name: "mainBranch",
    condition: () => true,
    action: () => true,
    branches: [{
        name: "maxBranch",
        condition: () => true,
        action: () => true,
        branches: [{
            name: "someDeepBranch",
            condition: () => true,
            action: () => true
        }]
    }]
});
const someDeepBranch = mainBranch.findBranch("someDeepBranch");
```
### branch,getAction(): function

Returns branch action function

### branch,getCondition(): function

Returns branch condition function

### branch,getName(): string

Returns branch name

### branch,getBranches(): Array<branch>

Returns all child branches

### branch.chain(branch): Branch

Add another branch to queue. All branches in queue will be invoked one by one after all child branches 
are done. Return current branch

#### example
```javascript
import { Branch } from "Horpyna";
const mainBranch = new Branch({ 
    name: "branchA",
    condition: () => true,
    action: value => value + "A",
    branches: [{
        name: "branchB",
        condition: () => true,
        action: value => value + "B",
    }]
});
mainBranch.chain({
    name: "branchC",
    condition: () => true,
    action: value => value + "C",
})
mainBranch.chain({
    name: "branchD",
    condition: () => true,
    action: value => value + "D",
})

mainBranch.execute("")
.then(console.log)//"ABCD"
```

### branch,setName(name: string): branch

Set new branch name

### branch,clone(): branch

Shallow copy current branch and return new branch

### branch.execute(input): promise

Returns promise resolvable to calculated output.

#### example
```javascript
import { Branch } from "Horpyna";
const mainBranch = new Branch({ 
    name: "mainBranch",
    condition: value => value > 10, 
    action:  value => value + 1,
});

mainBranch.execute(11)
    .then(console.log)//12
```

## LICENSE

MIT



