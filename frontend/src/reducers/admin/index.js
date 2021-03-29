import { combineReducers } from "redux";
import dashboard from "./dashbaord";
import teacher from "./teachers";

const adminRootReducers = combineReducers({ dashboard, teacher });

export default adminRootReducers;
