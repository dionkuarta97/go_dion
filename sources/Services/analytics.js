import analytics, { firebase } from "@react-native-firebase/analytics";



class Analytics {
  static init() {
    if (firebase.app().utils().isRunningInTestLab) {
      analytics().setAnalyticsCollectionEnabled(false);
    } else {
      analytics().setAnalyticsCollectionEnabled(true);
    }
  }

  static setCurrentScreen = async (screenName) => {
    await analytics().setCurrentScreen(screenName, screenName);
  };

  static logEvent = async (eventName, propertyObject = {}) => {
    await analytics().logEvent(eventName, propertyObject);
  };

  static logCustomEvent = async (keyValue) => {
    await analytics().logEvent('go_event', {
      event_key: keyValue,
    });
  };


}

export default Analytics;
