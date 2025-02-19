import Container from "./container"

export default function SiteHeader({ children, className }: Readonly<{ children: React.ReactNode, className?: string }>) {
	return (
		<header className={"" + (className ? " " + className : "")}>
			{children}
		</header>
	)
}
