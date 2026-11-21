const USERS_KEY = 'vueauth_users'
const SESSION_KEY = 'vueauth_session'

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function bytesToBase64(bytes) {
  let binary = ''
  bytes.forEach((byte) => { binary += String.fromCharCode(byte) })
  return btoa(binary)
}

function base64ToBytes(value) {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0))
}

async function hashPassword(password, saltBase64) {
  const salt = saltBase64
    ? base64ToBytes(saltBase64)
    : crypto.getRandomValues(new Uint8Array(16))

  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 120000, hash: 'SHA-256' },
    keyMaterial,
    256
  )
  return {
    salt: bytesToBase64(salt),
    hash: bytesToBase64(new Uint8Array(bits))
  }
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email }
}

export const authService = {
  async register({ name, email, password }) {
    const users = readUsers()
    const normalizedEmail = email.trim().toLowerCase()
    if (users.some((user) => user.email === normalizedEmail)) {
      throw new Error('An account with this email already exists.')
    }

    const { salt, hash } = await hashPassword(password)
    const user = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      salt,
      passwordHash: hash,
      createdAt: new Date().toISOString()
    }
    users.push(user)
    writeUsers(users)
    const safeUser = publicUser(user)
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser))
    return safeUser
  },

  async login({ email, password }) {
    const normalizedEmail = email.trim().toLowerCase()
    const user = readUsers().find((item) => item.email === normalizedEmail)
    if (!user) throw new Error('No account found with this email. Please register first.')

    const result = await hashPassword(password, user.salt)
    if (result.hash !== user.passwordHash) {
      throw new Error('Incorrect email or password.')
    }

    const safeUser = publicUser(user)
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser))
    return safeUser
  },

  getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
    } catch {
      return null
    }
  },

  logout() {
    localStorage.removeItem(SESSION_KEY)
  }
}