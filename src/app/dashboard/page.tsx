import Heading from "@/components/typography/heading";

export default async function AdminPage() {
	return (
		<>
			<Heading>Dashboard</Heading>
			<div className="flex flex-1 flex-col gap-4 md:p-4 pt-0">
				<div className="grid auto-rows-min gap-4 md:grid-cols-2">
					<div>
						<Heading level={2}>Analytics</Heading>
						<div className="aspect-video rounded-xl border" />
					</div>
					<div>
						<Heading level={2}>Sales</Heading>
						<div className="aspect-video rounded-xl border" />
					</div>
				</div>
				<Heading level={2}>Recent Orders</Heading>
				<div className="min-h-[100vh] flex-1 rounded-xl border md:min-h-min" />
			</div>
		</>
	)
}
