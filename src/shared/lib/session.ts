'use server'

import 'server-only'

import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies, headers } from 'next/headers'

const secretKey = process.env.SESSION_SECRET
const encodeKey = new TextEncoder().encode(secretKey)

interface PayloadToken extends JWTPayload {
  userId: string
}

export async function encrypt(payload: PayloadToken, expiresAt: string) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(encodeKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify<PayloadToken>(session, encodeKey, {
      algorithms: ['HS256']
    })
    return payload
  } catch (e) {
    console.log('Ошибка при декодировании сессии')
  }
}

async function createToken(
  tokenName: 'accessToken' | 'refreshToken',
  payload: PayloadToken
) {
  if (tokenName === 'accessToken') {
    const expiresAtAccess = new Date(Date.now() + 1 * 60 * 1000)
    return {
      token: await encrypt(payload, '1min'),
      expiresAt: expiresAtAccess
    }
  }
  // const expiresAtRefresh = new Date(Date.now() + 30 * 7 * 24 * 60 * 60 * 1000)
  const expiresAtRefresh = new Date(Date.now() + 2 * 60 * 1000)
  return {
    token: await encrypt(payload, '2min'),
    expiresAt: expiresAtRefresh
  }
}

export async function createSession(payload: PayloadToken) {
  const { token: accessToken, expiresAt: expiresAtAccess } = await createToken(
    'accessToken',
    payload
  )
  const { token: refreshToken, expiresAt: expiresAtRefresh } =
    await createToken('refreshToken', payload)

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

export const getSession = async (
  db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) => {
  const accessToken = (await headers()).get('Authorization')

  if (!accessToken) {
    return null
  }

  const payload = await decrypt(accessToken)

  if (!payload) {
    return null
  }

  return await db.user.findUnique({
    where: {
      id: payload.userId
    }
  })
}

export async function updateSession(refreshToken: string) {
  const payload = await decrypt(refreshToken)

  const { token: accessToken, expiresAt } = await createToken('accessToken', {
    userId: payload!.userId
  })

  const cookieStore = await cookies()

  cookieStore.set('accessToken', accessToken, {
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')
}
