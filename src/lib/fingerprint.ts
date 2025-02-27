"use client"

async function getFingerprintData() {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    hardwareConcurrency: navigator.hardwareConcurrency,
    screenWidth: screen.width,
    screenHeight: screen.height,
    screenColorDepth: screen.colorDepth,
    maxTouchPoints: navigator.maxTouchPoints,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    devicePixelRatio: window.devicePixelRatio,
  }
}

async function hashFingerprint(fingerprintData: fingerprintData) {
	const jsonString = JSON.stringify(fingerprintData)

	const encoder = new TextEncoder()
	const data = encoder.encode(jsonString)

	const hashBuffer = await crypto.subtle.digest('sha-256', data)
	const hashArray = Array.from(new Uint8Array(hashBuffer))
	return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export default async function generateFingerprint() {
  const fingerprintData = await getFingerprintData()
  return hashFingerprint(fingerprintData)
}

interface fingerprintData {
	userAgent: string,
  language: string,
	hardwareConcurrency: number,
	screenWidth: number,
	screenHeight: number,
	screenColorDepth: number,
	maxTouchPoints: number,
	timezone: string,
	devicePixelRatio: number,
}