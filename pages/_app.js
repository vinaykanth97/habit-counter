import Header from '../components/Header'
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main>
        {pageProps ? <Component {...pageProps} /> : ''}

      </main>

    </>
  )
}

export default MyApp
