import AuthService from "services/AuthService";
import { setLoggedInAction } from "actions/applicationActions";
import { store } from "store";
import { trackEvent } from "analytics/analytics";

class GoogleLogin {
  init() {
    const handleInitialize = (res) => {
      trackEvent("NavBar", "Sign In", "Sign In Button");
      AuthService.sendToken(res);
      store.dispatch(setLoggedInAction(true));
    };

    try {
      /*global google*/
      google.accounts.id.initialize({
        client_id:
          "55671715817-52m031hcf1mesq9djr925s3ft538cuur.apps.googleusercontent.com",
        callback: handleInitialize
      });
      google.accounts.id.renderButton(
        document.getElementById("google-sign-in"),
        {
          theme: "outline",
          size: "large"
        }
      );
    } catch (e) {
      console.log("Error creating Google sign in button", e);
    }
  }
}

export default new GoogleLogin();
