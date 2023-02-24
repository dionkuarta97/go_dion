import "react-native-gesture-handler";
import { registerRootComponent } from "expo";

import App from "./sources/App";
Sentry.init({
  dsn: "https://fb1b8d1e838048b9bcccc6a8c533ea51@o4504623697100800.ingest.sentry.io/4504623702540288",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
export default Sentry.wrap(App);
