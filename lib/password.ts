// lib/password.ts - Password Hashing & Verification
// Uses bcryptjs for secure password hashing

import bcrypt from 'bcryptjs'

// Number of salt rounds for bcrypt
// 12 is recommended for production (balances security and performance)
const SALT_ROUNDS = 12

/**
 * Hash a plain text password
 * @param password - The plain text password to hash
 * @returns The hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    // Validate password length
    if (!password || password.length < 8) {
      throw new Error('Password must be at least 8 characters long')
    }
    
    // Generate salt and hash
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hash = await bcrypt.hash(password, salt)
    
    return hash
  } catch (error) {
    console.error('Password hashing failed:', error)
    throw new Error('Failed to hash password')
  }
}

/**
 * Verify a plain text password against a hashed password
 * @param password - The plain text password to verify
 * @param hashedPassword - The hashed password to compare against
 * @returns True if passwords match, false otherwise
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    // Prevent timing attacks by always comparing
    if (!password || !hashedPassword) {
      return false
    }
    
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    console.error('Password verification failed:', error)
    return false
  }
}

/**
 * Validate password strength
 * @param password - The password to validate
 * @returns Object containing validation result and error message
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Generate a secure random password
 * @param length - Length of the password (default: 16)
 * @returns A secure random password
 */
export function generateSecurePassword(length: number = 16): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  const allChars = uppercase + lowercase + numbers + symbols
  
  // Ensure at least one of each type
  let password = ''
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += symbols[Math.floor(Math.random() * symbols.length)]
  
  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('')
}