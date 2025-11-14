const express = require('express')
const Lead = require('../models/Lead')
const University = require('../models/University')

const router = express.Router()

// Return fees JSON for each university (try DB first, fallback to static)
router.get('/fees', async (req, res) => {
  const univ = Number(req.query.univ || 1)
  try {
    if (University && typeof University.findOne === 'function') {
      const doc = await University.findOne({ univId: univ }).lean()
      if (doc) return res.json(doc)
    }
  } catch (e) {
    console.warn('DB fees lookup failed', e.message)
  }

  // static fallback
  const data = {
    1: {
      univId: 1,
      name: 'Stellar Private University',
      overview: 'Stellar University offers industry-aligned courses, excellent placements, and modern facilities.',
      courses: [
        { code: 'BTECH', name: 'B.Tech', fees: { min: '2,00,000', max: '4,50,000' }, details: 'Per year approximate.' },
        { code: 'MBA', name: 'MBA', fees: { min: '3,00,000', max: '6,00,000' }, details: 'Includes placement training.' }
      ]
    },
    2: {
      univId: 2,
      name: 'Apex Technical Institute',
      overview: 'Apex Technical Institute stands at the forefront of technological education with industry collaborations and applied research.',
      courses: [
        { code: 'BTE', name: 'B.Tech - Electronics', fees: { min: '1,10,000', max: '1,40,000' } },
        { code: 'BTC', name: 'B.Tech - Computers', fees: { min: '1,20,000', max: '1,50,000' } }
      ]
    }
  }
  return res.json(data[univ] || data[1])
})

// Receive lead, save to DB and forward to Pipedream webhook (if configured)
router.post('/lead', async (req,res)=>{
  const {name,email,phone,state,course,intake,consent,univId} = req.body
  if(!consent) return res.status(400).json({error:'Consent required'})
  if(!/^\d{10}$/.test(String(phone||''))) return res.status(400).json({error:'Phone must be 10 digits'})

  try{
    // save to DB if possible
    const lead = new Lead({name,email,phone,state,course,intake,consent,univId})
    try{ await lead.save() } catch(e){ console.warn('DB save failed', e.message) }

    // forward to Pipedream if webhook set — use safe helper that can fall back if global fetch isn't present
    const pd = process.env.PIPEDREAM_WEBHOOK
    if(pd){
      try{
        // prefer global fetch (Node 18+), otherwise try to require node-fetch at runtime
        let _fetch = global.fetch
        if(typeof _fetch !== 'function'){
          try{
            // node-fetch v2 supports CommonJS require
            _fetch = require('node-fetch')
          }catch(e){
            console.warn('No global fetch and node-fetch not installed; skipping Pipedream forward. Install node-fetch or use Node 18+ to enable forwarding.')
            _fetch = null
          }
        }
        if(_fetch){
          await _fetch(pd, {method:'POST', body: JSON.stringify({name,email,phone,state,course,intake,univId}), headers: {'Content-Type':'application/json'}})
        }
      }catch(e){ console.warn('Forward to Pipedream failed', e.message) }
    }

    return res.json({message:'Lead received'})
  }catch(e){
    console.error(e)
    return res.status(500).json({error:'Server error'})
  }
})

module.exports = router

// -- Dev-only: list leads (useful to verify DB saves). Remove in production.
router.get('/leads', async (req, res) => {
  try{
    const docs = await Lead.find().sort({createdAt:-1}).limit(50).lean()
    res.json(docs)
  }catch(e){ res.status(500).json({error: e.message}) }
})
