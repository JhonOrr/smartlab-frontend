import "@/styles/globals.css";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const isSidebar = router.pathname.startsWith("/admin");

  let LayoutComponent = "";

  if (isSidebar) {
    return (
      <SessionProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
        
    );
  } else {
    return (
      <SessionProvider>  
        <Component {...pageProps} />;
      </SessionProvider>

    )
  }
}
