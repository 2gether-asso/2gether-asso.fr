async function digest(algorithm: AlgorithmIdentifier, str?: string, base64: boolean = false)
{
	if (!str) {
		return ''
	}

	const shasum = new Uint8Array(await crypto.subtle.digest(algorithm, new TextEncoder().encode(str)))

	if (base64)
	{
		return btoa(String.fromCharCode(...shasum))
	}

	return Array.from(shasum).map(b => b.toString(16).padStart(2, '0')).join('')
}

export default digest
