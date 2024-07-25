import { Login } from '../components/users/Login'
import { Register } from '../components/users/Register'
import { Layout } from './Layout'
import './styles/AuthorizationPage.css'

function AuthorizationPage() {

  return (
    <Layout>
      <div className="authorization__container">
        <Register/>
        <Login/>
      </div>
    </Layout>
  )
}

export default AuthorizationPage
