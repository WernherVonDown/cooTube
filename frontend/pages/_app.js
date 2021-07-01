import '../styles/index.scss'
import { AuthContextProvider } from '../stores/authContext'
import Header from '../components/header'
import axios from 'axios'
import config from '../config'
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <AuthContextProvider>
     <Header>
      <Component {...pageProps} />
    </Header>
  </AuthContextProvider>
}