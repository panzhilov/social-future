import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../components/Navigation';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    return(
    <>

        <Head>
            <link rel="stylesheet" href="/css/styles.css" />
        </Head>

        <Navigation />

        <Component {...pageProps} />
    </>
    );
  }

  export default MyApp; 