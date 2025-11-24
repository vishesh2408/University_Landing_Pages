
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = require('./routes/api')

const app = express()

// Configure CORS allowlist from env:
// - ALLOWED_ORIGINS: comma-separated list (preferred)
// - FRONTEND_URL: single origin (fallback)
// Optional: set ALLOW_ALL_ORIGINS=true to temporarily disable origin checks (debug only)
const rawAllowed = process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || ''
const allowedOrigins = rawAllowed.split(',').map(s => s.trim()).filter(Boolean)
const allowAll = String(process.env.ALLOW_ALL_ORIGINS || '').toLowerCase() === 'true'

const corsOptions = {
  origin: function(origin, callback) {
    // allow requests with no origin (e.g. curl, server-side)
    if (!origin) return callback(null, true)

    // Debug bypass: allow everything when explicitly enabled
    if (allowAll) {
      console.warn('CORS: ALLOW_ALL_ORIGINS is true — allowing origin', origin)
      return callback(null, true)
    }

    // No allowlist configured — allow all origins (not recommended for production)
    if (allowedOrigins.length === 0) {
      console.warn('CORS: no allowlist set — allowing origin', origin)
      return callback(null, true)
    }

    // Allowed list present — check membership
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true)
    }

    // Not allowed — log for debugging and reject
    console.warn('CORS policy: Origin not allowed ->', origin)
    return callback(new Error('CORS policy: Origin not allowed'))
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type','Authorization']
}

app.use(cors(corsOptions))
// support preflight for all routes
app.options('*', cors(corsOptions))
app.use(bodyParser.json())

const PORT = process.env.PORT || 4000

async function start(){
  if(process.env.MONGO_URI){
    try{
      await mongoose.connect(process.env.MONGO_URI)
      console.log('Mongo connected')
    }catch(e){
      console.error('Mongo connection failed', e.message)
    }
  } else {
    console.warn('MONGO_URI not set. Saving to DB will fail until configured.')
  }

  if (allowedOrigins.length > 0) console.log('CORS allowlist:', allowedOrigins)
  else console.log('CORS allowlist not set — allowing all origins (not recommended for production)')

  app.use('/api', api)

  app.listen(PORT, ()=> console.log(`Server running on ${PORT}`))
}

start()
