const oAuthLogin = (
  provider: "google" | "github",
  client_id: string,
  state?: string
) => {
  if (provider === "google") {
    const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    const params: Record<string, string> = {
      client_id: client_id,
      redirect_uri: "http://localhost:3000/login/oauth",
      response_type: "token",
      scope:
        "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
      include_granted_scopes: "true",
      state: "",
    };

    const urlParams = new URLSearchParams(params).toString();
    const authUrl = `${oauth2Endpoint}?${urlParams}`;

    // Redirect the user to Google's OAuth 2.0 endpoint
    window.location.href = authUrl;
  }
};

export { oAuthLogin };
