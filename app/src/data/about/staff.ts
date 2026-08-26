import staffData from './staff.json'

interface StaffMember
{
	name: string
	role: string
	website?: string
	picture?: string
	group?: string
}

const images = import.meta.glob('./images/*.{png,jpg,jpeg}', { query: '?url', import: 'default' })

let _loadStaff: Promise<StaffMember[]>

async function loadStaff(): Promise<StaffMember[]>
{
	const sites = await Promise.all(
		staffData.map(async staff =>
			{
				if (!staff.picture)
				{
					return staff
				}

				const imageLoader = images[staff.picture]
				if (!imageLoader)
				{
					console.error(`Image for '${staff.name}' not found (provided: '${staff.picture}')`)
					return staff
				}

				staff.picture = await imageLoader()
				return staff
			})
	)

	return sites
}

export type { StaffMember }

export default async function getStaff()
{
	_loadStaff = _loadStaff || loadStaff()
	return _loadStaff
}
