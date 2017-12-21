export default function createSetValueAction({ actionFunction, conditionFunction = () => true}) {
    return (...values) => {
        if(conditionFunction(...values)) {
            actionFunction(...values);
        }
    };

}
