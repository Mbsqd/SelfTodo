import { Layout } from './Layout'
import "./styles/Page401.css"

function Page401() {

  return (
	<Layout>
			<div className="status-block">
				<h2 className="status-code">401 Unauthorized</h2>
				<p className="status-message">You are not authorized to view this page. Please authorize.</p>
			</div>
	</Layout>
  )
}

export default Page401