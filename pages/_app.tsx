import { useEffect, FC } from 'react'; // add useEffect here
import { useRouter } from 'next/router';
import { SessionProvider, useSession } from 'next-auth/react';
import type { Session } from 'next-auth'; // If you have a custom session type, import that instead

// Define your session type
interface CustomSession extends Session {
  id: string;
  email: string;
  name: string;
}

interface MyAppProps {
  Component: FC;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  // useSession now returns an object
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  // Redirect to login page if not authenticated and not loading
  useEffect(() => {
    if (!loading && !session && router.pathname !== '/app/login/page') {
      router.push('/app/login/page');
    }
  }, [session, loading, router]);

  // If the session is loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the component only when the user is logged in
  if (session) {
    return <Component {...pageProps} />;
  }

  // If not loading and not authenticated, this line will not be reached because of the useEffect redirect
  return null;
}

const App: FC<MyAppProps> = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <MyApp Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

export default App;
