import { LOAD_APP, APP_LOADED } from "./appTypes";

const loadApp = () => {
  return {
    type: LOAD_APP,
  };
};

const appLoaded = (data) => {
  return {
    type: APP_LOADED,
    payload: data,
  };
};

export { loadApp, appLoaded };
