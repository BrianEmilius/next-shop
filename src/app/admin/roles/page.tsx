import AddRole from "@/components/add-role-form"
import EditRole from "@/components/edit-role-form"
import Heading from "@/components/typography/heading"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PrismaClient } from "@prisma/client"

export default async function RolesPage() {
	const prisma = new PrismaClient()

	const roles = await prisma.roles.findMany({
		include: {
			roles_has_permissions: {
				include: {
					permissions: true
				}
			}
		}
	})
	
	const permissions = await prisma.permissions.findMany()

	return (
		<>
			<Heading>Roles</Heading>
			<AddRole />
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-4/5">Role name</TableHead>
						<TableHead colSpan={2} className="w-1/5">Options</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{roles.map(role => (
						<TableRow key={role.role_name}>
							<TableCell>{role.role_name}</TableCell>
							<TableCell><EditRole role={role} permissions={permissions} /></TableCell>
							<TableCell>Delete</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	)
}
