import { Link, useNavigate } from "react-router-dom";
import "./styles/Header.css";

const nameToUpperCase = (name: string | null) => {
	if (name) {
		return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
	}
	return "";
};

export function Header() {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		navigate("/authorization");
	};

	const token = localStorage.getItem("token");
	const isAuthenticated = Boolean(token);

	const username = nameToUpperCase(localStorage.getItem("username"));

	return (
		<header>
			<div className="container">
				<div className="header__inner">
					<h1 className="header__tittle-logo">
						<Link className="header__tittle-link" to="/">
							SelfTodo
						</Link>
					</h1>
					<div className="header__auth-buttons">
						{isAuthenticated ? (
							<>
								<span className="header__username">{username}</span>
								<button className="btn__sign btn__sign-out" onClick={handleLogout}>
									Log out
								</button>
							</>
						) : (
							<Link to="/authorization">
								<button className="btn__sign btn__sign-up">Authorization</button>
							</Link>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
