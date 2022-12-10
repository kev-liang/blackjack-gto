class GoogleLogin {
  init() {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "55671715817-52m031hcf1mesq9djr925s3ft538cuur.apps.googleusercontent.com",
      callback: this.handleInitialize
    });
    google.accounts.id.renderButton(document.getElementById("google-sign-in"), {
      theme: "outline",
      size: "large"
    });
  }

  handleInitialize(res) {
    console.log("jhwt", res);
  }
}

export default new GoogleLogin();
