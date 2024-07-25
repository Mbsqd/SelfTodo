import { Layout } from './Layout'
import "./styles/Page404.css"

function Page404() {

  return (
	<Layout>
			<div className="status-block">
				<h2 className="status-code">404 Page Not Found</h2>
				<p className="status-message">Sorry, the page you are looking for could not be found.</p>
			</div>
	</Layout>
  )
}

export default Page404