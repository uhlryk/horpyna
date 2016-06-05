/**
 * help to calculate relatives components state
 */

import * as STATUS from "../constants/statuses";

export function hasComponentsStatus(components, statuses) {
  if(statuses.length === undefined) {
    statuses = [statuses];
  }
  let doneCount = components.reduce((doneCount, component) => {
    if(statuses.indexOf(component.status) !== -1) {
      return ++doneCount;
    } else {
      return doneCount;
    }
  }, 0);
  return doneCount === components.length;
}


