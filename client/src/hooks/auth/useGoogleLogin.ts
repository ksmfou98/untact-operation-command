const clientId =
  "135690089362-ajbisu3vdskt7eogjk847bpt9hgc7hav.apps.googleusercontent.com";

export default function useGoogleLogin() {
  const onSuccess = async (response: any) => {
    console.log(response);

    const {
      googleId,
      profileObj: { email, name },
    } = response;

    console.log(response);
    // await onSocial({
    //   socialId: googleId,
    //   socialType: "google",
    //   email,
    //   nickname: name,
    // });
  };
  const onFailure = (error: any) => {
    console.log(error);
  };

  return {
    clientId,
    onSuccess,
    onFailure,
  };
}
