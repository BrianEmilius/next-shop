export default function Heading({ children, level = 1, className }: Readonly<{ children: React.ReactNode, level?: number, className?: string }>) {
	switch (level) {
		case 1:
			return <h1 className={"font-bold text-2xl" + (className ? " " + className : "")}>{children}</h1>
		case 2:
			return <h2 className={"font-bold text-xl" + (className ? " " + className : "")}>{children}</h2>
		case 3:
			return <h3 className={"font-semibold text-xl" + (className ? " " + className : "")}>{children}</h3>
		case 4:
			return <h4 className={"font-bold text-lg" + (className ? " " + className : "")}>{children}</h4>
		case 5:
			return <h5 className={"font-semibold text-lg" + (className ? " " + className : "")}>{children}</h5>
		case 6:
			return <h6 className={"font-semibold italic text-lg" + (className ? " " + className : "")}>{children}</h6>
	}
}
