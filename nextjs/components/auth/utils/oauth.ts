const oAuthLogin = (
  provider: "google" | "github",
  client_id: string,
  state?: string
) => {
  let oauth2Endpoint = "";
  let params: Record<string, string> = {};
  if (provider === "google") {
    oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
    params = {
      client_id: client_id,
      redirect_uri: "http://localhost:3000/login/oauth?provider=google",
      response_type: "token",
      scope:
        "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
      include_granted_scopes: "true",
      state: state ?? "",
    };
  } else if (provider === "github") {
    oauth2Endpoint = "https://github.com/login/oauth/authorize";
    params = {
      client_id: client_id,
      redirect_uri: "http://localhost:3000/login/oauth?provider=github",
      response_type: "token",
      scope: "user",
      state: state ?? "",
    };
  }
  const urlParams = new URLSearchParams(params).toString();
  // Redirect the user to Google's OAuth 2.0 endpoint
  const authUrl = `${oauth2Endpoint}?${urlParams}`;
  window.location.href = authUrl;
};

export { oAuthLogin };
