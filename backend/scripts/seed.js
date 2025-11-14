require('dotenv').config()
const mongoose = require('mongoose')
const University = require('../models/University')

async function run(){
  if(!process.env.MONGO_URI){
    console.error('MONGO_URI not set in env')
    process.exit(1)
  }
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to Mongo for seeding')

  const univ1 = {
    univId: 1,
    name: 'Stellar Private University',
    overview: 'Stellar University offers industry-aligned courses, excellent placements, and modern facilities.',
    courses: [
      { code: 'BTECH', name: 'B.Tech', fees: { min: '2,00,000', max: '4,50,000' }, details: 'Per year approximate.' },
      { code: 'MBA', name: 'MBA', fees: { min: '3,00,000', max: '6,00,000' }, details: 'Includes placement training.' }
    ],
    placements: '90%+ placement assistance',
    facilities: ['Labs','Hostel','Library'],
    brochureUrl: ''
  }

  const univ2 = {
    univId: 2,
    name: 'Apex Technical Institute',
    overview: 'Apex Technical Institute stands at the forefront of technological education with strong industry partnerships and applied research labs.',
    courses: [
      { code: 'BSC', name: 'B.Sc', fees: { min: '50,000', max: '1,20,000' } },
      { code: 'MSC', name: 'M.Sc', fees: { min: '60,000', max: '1,50,000' } }
    ],
    placements: 'Internships and placements with tech companies',
    facilities: ['Research labs','Incubation centre'],
    brochureUrl: ''
  }

  await University.findOneAndUpdate({univId:1}, univ1, {upsert:true})
  await University.findOneAndUpdate({univId:2}, univ2, {upsert:true})
  console.log('Seeded universities')
  process.exit(0)
}

run().catch(err=>{ console.error(err); process.exit(1) })
