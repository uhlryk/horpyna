import Horpyna from "../dist/";

const mainBranch = new Horpyna.Branch({
    name: "mainBranch",
    branches: [
        {
            name: "calcBranch",
            condition: value => value < 100000,
            action: value => ++value
        }
    ]
});
mainBranch.getBranch("calcBranch").addBranch(mainBranch);
console.time("measureIteration");
mainBranch.execute(0).then(response => {
    console.log("finished", response);
    console.timeEnd("measureIteration"); //988.085ms // 743.653ms - 781.959ms
});

console.time("comparisonIteration");
for (let i = 0; i < 100000; i++) {}
console.timeEnd("comparisonIteration"); //0.843ms
