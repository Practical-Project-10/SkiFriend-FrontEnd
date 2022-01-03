import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

//---- Reducer ----
import User from "./modules/user";
import FreeBoard from "./modules/freeboard";
import Carpool from "./modules/carpool";
import Profile from "./modules/profile";
import Image from "./modules/image";
import Main from "./modules/main";
import Chat from "./modules/chat";

//---- history----
export const history = createBrowserHistory();

//---- rootReducer ----
const rootReducer = combineReducers({
  user: User,
  freeboard: FreeBoard,
  carpool: Carpool,
  profile: Profile,
  image: Image,
  main: Main,
  chat: Chat,
  router: connectRouter(history),
});

// ---- middleware ----
const middlewares = [thunk.withExtraArgument({ history: history })];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

//---- redux devTools ----
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

//---- 미들웨어 묶기 ----
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

//---- 스토어 만들기 ----
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
