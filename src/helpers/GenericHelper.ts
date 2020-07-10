export class GenericHelper {
  public static getUrlQueryParamByName(name, url?) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  public static crossBrowserUrlRedirect = (url: string, newPage?: false) => {
    if (newPage) {
      GenericHelper.windowOpen(url);
    }

    // https://stackoverflow.com/a/31223302/3192151
    setTimeout(function () {
      document.location.href = url;
    }, 250);
  };

  public static windowOpen(url: string) {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
      // Safari doesn't like window.open, so lets use this alternative method.
      // Reference: https://stackoverflow.com/questions/20696041/window-openurl-blank-not-working-on-imac-safari
      window.location.assign(url);
      return;
    }

    // for all other *decent* browsers, lets use window.open
    window.open(url);

    return;
  }

  public static getTelegramUrl() {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
      return "https://apps.apple.com/us/app/telegram-messenger/id686449807";
    }

    return "https://play.google.com/store/apps/details?id=org.telegram.messenger&hl=en_CA";
  }
}
