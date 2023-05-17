import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import '../styles/global.module.css';
import '../styles/button.module.css';
type CustomSession = {
  id: string;
  email: string;
  name: string;
  session: any;
};


function MyApp({ Component, pageProps }: AppProps) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      return; // Do nothing if the user is logged in
    }
    router.push('/app/login/page'); // Redirect to login if not authenticated
  }, [session, router]); // Include session in the dependency array


  // Render the component only when the user is logged in
  if (session) {
    return <Component {...pageProps} />;
  }

  // Optional loading state
  return <div>Loading...</div>;
}

export default MyApp;