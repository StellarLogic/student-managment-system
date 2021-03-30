import { combineReducers } from "redux";
import dashboard from "./dashbaord";
import teacher from "./teachers";
import student from "./students";
import role from "./roles";

const adminRootReducers = combineReducers({
  dashboard,
  role,
  teacher,
  student,
});

export default adminRootReducers;
