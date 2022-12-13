import AuthService from "services/AuthService";
import { setLoggedInAction } from "actions/applicationActions";
import { store } from "store";

class GoogleLogin {
  init() {
    const handleInitialize = (res) => {
      AuthService.sendToken(res);
      store.dispatch(setLoggedInAction(true));
    };

    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "55671715817-52m031hcf1mesq9djr925s3ft538cuur.apps.googleusercontent.com",
      callback: handleInitialize
    });
    google.accounts.id.renderButton(document.getElementById("google-sign-in"), {
      theme: "outline",
      size: "large"
    });
  }
}

export default new GoogleLogin();
