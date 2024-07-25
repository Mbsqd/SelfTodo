import { Footer } from '../components/basic/Footer'
import { Header } from '../components/basic/Header'
import "./styles/Layout.css"

interface LayoutProps {
	children: React.ReactNode
}

export function Layout({ children } : LayoutProps) {
	return (
		<div className="wrapper">
			<Header/>
				<main className="main">
					{children}
				</main>
			<Footer/>
		</div>
	)
}