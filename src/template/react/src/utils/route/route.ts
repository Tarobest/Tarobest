import switchTab from "./switchTab";
import navigateBack from "./navigateBack";
import getNowRouteinfo from "./getNowRouteinfo";
import { navigateTo, redirectTo, reLaunch } from "./navigators";

export interface Options {
  success?: Function;
  fail?: Function;
  complete?: Function;
}

const TarobestRouter = {
  navigateTo,
  redirectTo,
  switchTab,
  navigateBack,
  reLaunch,
  getNowRouteinfo,
};

export default TarobestRouter;
