import Script from "next/script";

const GA_ID = "G-R7G0P367SP";

export default function GoogleAnalytics() {
  // Do not send development traffic to production analytics.
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function () {
            window.dataLayer.push(arguments);
          };

          window.gtag("js", new Date());
          window.gtag("config", "${GA_ID}");
        `}
      </Script>

      <Script
        id="google-analytics-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}