export interface Role {
	id: number
	role_name: string
	roles_has_permissions: {
		roles_id: number
		permissions_id: number
		permissions: Permission[]
	}[]
}

export interface Permission {
	id: number
	permission_name: string
}