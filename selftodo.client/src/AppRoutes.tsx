import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthorizationPage from "./pages/AuthorizationPage";
import HomePage from "./pages/HomePage";
import Page401 from "./pages/Page401";
import ProtectedRoute from "./components/users/ProtectedRoute";
import Page404 from "./pages/Page404";

export default function AppRoutes() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>
					}
				/>

				<Route path="/authorization" element={<AuthorizationPage />} />
				<Route path="/401" element={<Page401 />} />
				<Route path="*" element={<Page404 />} />
			</Routes>
		</Router>
	);
}
