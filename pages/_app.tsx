import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { StoreProvider } from "providers";
import { useEffect, useState } from "react";
import { UnflexibleProvider } from "unflexible-ui-core";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "styles/global.scss";
import "styles/inview.scss";
import "styles/font.scss";
import { fonts } from "variables";

const config = {
  stacked: {
    padding: {
      wide: "180px",
      normal: "150px",
      narrow: "90px",
      thin: "45px",
    },
    gap: {
      wide: "3rem",
      normal: "1.5rem",
      narrow: ".75rem",
      thin: ".5rem",
    },
  },
  plainText: {
    baseFamily: fonts.sansSerif,
    h1Family: fonts.sansSerif,
    h2Family: fonts.sansSerif,
    h3Family: fonts.sansSerif,
    h4Family: fonts.sansSerif,
    h5Family: fonts.sansSerif,
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("inview__in");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0,
          rootMargin: "0px 300px 0px 300px",
        },
      );

      const targets = document.getElementsByClassName("inview");
      for (let i = 0; i < targets.length; i++) {
        observer.observe(targets[i]);
      }
    }, 500);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>

      <UnflexibleProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <StoreProvider>
              <Component {...pageProps} />
            </StoreProvider>
          </Hydrate>
        </QueryClientProvider>
      </UnflexibleProvider>
    </>
  );
}

export default MyApp;
