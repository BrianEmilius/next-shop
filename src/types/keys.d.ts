export interface PublicKey {
	kid: string
	kty: string
	n: string
	e: string
	alg: string
}

export interface PrivateKey extends PublicKey {
	d: string
	p: string
	q: string
	dp: string
	dq: string
	qi: string
}