import cors from 'cors'

const ACCEPTED_ORIGINS = [
    // Cambiar si es necesario, por el puerto en el corren el proyecto completo: npm run dev
  'http://localhost:5173' 
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
    }
})