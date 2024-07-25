import { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
	children : ReactElement
}

const ProtectedRoute : React.FC<ProtectedRouteProps> = ({ children }) : ReactElement => {
	const token = localStorage.getItem("token");

	if(!token) {
		return <Navigate to="/401" replace/>
	}
	
	return children;
}

export default ProtectedRoute