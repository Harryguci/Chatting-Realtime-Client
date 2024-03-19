const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? process.env.NEXT_PUBLIC_SERVER_URI : 'https://localhost:3001'
export const socketServer = dev ? process.env.NEXT_PUBLIC_SOCKET_URI : 'wss://localhost:3001'