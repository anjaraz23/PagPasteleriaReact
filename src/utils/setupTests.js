import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/react'

const crearStorageMock = () => {
  let store = {}
  return {
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => {
      store[key] = String(value)
    },
    removeItem: (key) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
}

Object.defineProperty(window, 'localStorage', {
  value: crearStorageMock(),
  writable: true,
})

Object.defineProperty(window, 'sessionStorage', {
  value: crearStorageMock(),
  writable: true,
})

beforeEach(() => {
  window.localStorage.clear()
  window.sessionStorage.clear()
})

afterEach(() => {
  cleanup()
})