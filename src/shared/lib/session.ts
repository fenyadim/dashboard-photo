'use server'

import 'server-only'

import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET
const encodeKey = new TextEncoder().encode(secretKey)
const expiresAtAccess = new Date(Date.now() + 1 * 60 * 1000)
const expiresAtRefresh = new Date(Date.now() + 30 * 7 * 24 * 60 * 60 * 1000)

export async function encrypt(payload: JWTPayload, expiresAt: string) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(encodeKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodeKey, {
      algorithms: ['HS256']
    })
    return payload
  } catch (e) {
    console.log('Ошибка при декодировании сессии')
  }
}

export async function createSession(userId: string) {
  // const expiresAtAccess = new Date(Date.now() + 15 * 60 * 1000)
  const expiresAtAccess = new Date(Date.now() + 2 * 60 * 1000)
  const expiresAtRefresh = new Date(Date.now() + 30 * 7 * 24 * 60 * 60 * 1000)
  const accessToken = await encrypt({ userId, expiresAtAccess }, '1min')
  const refreshToken = await encrypt({ userId, expiresAtRefresh }, '30d')
  const cookieStore = await cookies()

  cookieStore.set('accessToken', accessToken, {
    secure: true,
    expires: expiresAtAccess,
    sameSite: 'lax',
    path: '/'
  })
  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAtRefresh,
    sameSite: 'lax',
    path: '/'
  })

  return { accessToken, refreshToken }
}

export async function updateSession(refreshToken: string) {
  const refreshTokenCookie = (await cookies()).get('refreshToken')?.value
  const cookieStore = await cookies()

  if (refreshToken !== refreshTokenCookie) {
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      expires: expiresAtRefresh
    })
  }
  const accessToken = (await cookies()).get('accessToken')?.value
  const payload = await decrypt(accessToken)

  if (!payload || !accessToken) {
    return null
  }

  cookieStore.set('accessToken', accessToken, {
    secure: true,
    expires: expiresAtAccess
  })

  console.log('Сессия обновлена')
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('accessToken')
}
