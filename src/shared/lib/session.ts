'use server'

import 'server-only'

import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET
const encodeKey = new TextEncoder().encode(secretKey)

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

async function createToken(
  tokenName: 'accessToken' | 'refreshToken',
  userId: string
) {
  if (tokenName === 'accessToken') {
    const expiresAtAccess = new Date(Date.now() + 15 * 60 * 1000)
    return {
      token: await encrypt({ userId }, '15min'),
      expiresAt: expiresAtAccess
    }
  }
  const expiresAtRefresh = new Date(Date.now() + 30 * 7 * 24 * 60 * 60 * 1000)
  return {
    token: await encrypt({ userId, expiresAtRefresh }, '30d'),
    expiresAt: expiresAtRefresh
  }
}

export async function createSession(userId: string) {
  const { token: accessToken, expiresAt: expiresAtAccess } = await createToken(
    'accessToken',
    userId
  )
  const { token: refreshToken, expiresAt: expiresAtRefresh } =
    await createToken('refreshToken', userId)
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
      secure: true
    })
  }

  const payload = await decrypt(refreshTokenCookie)

  const { token: accessToken, expiresAt: expiresAtAccess } = await createToken(
    'accessToken',
    payload?.userId as string
  )

  cookieStore.set('accessToken', accessToken, {
    secure: true,
    expires: expiresAtAccess
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')
}
