import { LOAD_APP, APP_LOADED } from "./appTypes";

const loadApp = () => ({
  type: LOAD_APP,
});

const appLoaded = (data) => ({
  type: APP_LOADED,
  payload: data,
});

export { loadApp, appLoaded };
