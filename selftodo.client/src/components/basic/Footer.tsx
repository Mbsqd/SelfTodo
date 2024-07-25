import "./styles/Footer.css";
import divideLine from "../../assets/icons/Line.svg"
import telegramIcon from "../../assets/icons/telegram.svg"
import githubIcon from "../../assets/icons/github.svg"

export function Footer() {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer__inner">
					<p>SelfTodo, 2024</p>
					<img src={divideLine} alt="dividing line" />
					<a href="https://t.me/mbsqd001">
						<img src={telegramIcon} alt="telegram icon" />
					</a>
					<a href="https://github.com/Mbsqd">
						<img src={githubIcon} alt="github icon" />
					</a>
				</div>
			</div>
		</footer>
	);
}
