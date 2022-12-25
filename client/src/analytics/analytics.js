import ReactGA from "react-ga4";

const trackEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label
  });
};

export { trackEvent };
