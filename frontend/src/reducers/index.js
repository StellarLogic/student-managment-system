import { combineReducers } from "redux";
import authReducer from "./auth/auth";
import changeState from "./theme/theme";
import adminRootReducers from "./admin/index";

const rootReducer = combineReducers({
  auth: authReducer,
  changeState,
  admin: adminRootReducers,
});

export default rootReducer;
