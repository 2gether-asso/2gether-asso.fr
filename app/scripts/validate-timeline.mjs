// Validates src/data/about/timeline.json:
// - each entry has a non-empty date, title and description
// - dates match DD/MM/YYYY or DD-DD/MM/YYYY (multi-day event)
// - entries are sorted from most recent to oldest, as the timeline UI expects

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const timelinePath = fileURLToPath(new URL('../src/data/about/timeline.json', import.meta.url))
const timeline = JSON.parse(readFileSync(timelinePath, 'utf-8'))

const dateExp = /^(\d{2})(?:-\d{2})?\/(\d{2})\/(\d{4})$/

function parseDate(date)
{
	const match = dateExp.exec(date)
	if (!match)
	{
		return null
	}

	const [, day, month, year] = match
	return new Date(Number(year), Number(month) - 1, Number(day))
}

const errors = []

let previousDate = null
let previousLabel = null

timeline.forEach((entry, index) =>
	{
		const label = `entry #${index + 1} (${entry.title ?? 'untitled'})`

		for (const field of ['date', 'title', 'description'])
		{
			if (typeof entry[field] !== 'string' || entry[field].trim() === '')
			{
				errors.push(`${label}: missing or empty "${field}"`)
			}
		}

		if (typeof entry.date !== 'string')
		{
			return
		}

		const date = parseDate(entry.date)
		if (!date)
		{
			errors.push(`${label}: date "${entry.date}" doesn't match DD/MM/YYYY or DD-DD/MM/YYYY`)
			return
		}

		if (previousDate && date > previousDate)
		{
			errors.push(`${label}: date "${entry.date}" is more recent than "${previousLabel}" right above it — timeline must stay sorted from most recent to oldest`)
		}

		previousDate = date
		previousLabel = entry.date
	})

if (errors.length > 0)
{
	console.error(`Timeline validation failed with ${errors.length} error(s):\n`)
	errors.forEach(error => console.error(`  - ${error}`))
	process.exit(1)
}

console.log(`Timeline OK (${timeline.length} entries).`)
