export default function Container({ children, className }: Readonly<{ children: React.ReactNode, className?: string }>) {
	return (
		<div className={"w-full p-2 mx-auto md:w-3/4 lg:w-4/5 xl:w-3/5" + (className ? " " + className : "")}>
			{children}
		</div>
	)
}
