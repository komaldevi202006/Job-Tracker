const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { userId: req.userId }
    })
    res.json(jobs)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Add job
const addJob = async (req, res) => {
  const { company, role, status, notes } = req.body
  try {
    const job = await prisma.job.create({
      data: { company, role, status, notes, userId: req.userId }
    })
    res.status(201).json(job)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Update job
const updateJob = async (req, res) => {
  const { id } = req.params
  const { company, role, status, notes } = req.body
  try {
    const job = await prisma.job.update({
      where: { id: parseInt(id) },
      data: { company, role, status, notes }
    })
    res.json(job)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete job
const deleteJob = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.job.delete({ where: { id: parseInt(id) } })
    res.json({ message: 'Job deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { getJobs, addJob, updateJob, deleteJob }

//upload resume 
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fs = require('fs')
    if (!fs.existsSync('uploads')) fs.mkdirSync('uploads')
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage })

const uploadResume = async (req, res) => {
  try {
    const { id } = req.params
    const resumeUrl = `/uploads/${req.file.filename}`
    const job = await prisma.job.update({
      where: { id: parseInt(id) },
      data: { resumeUrl }
    })
    res.json(job)
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' })
  }
}

module.exports = { getJobs, addJob, updateJob, deleteJob, uploadResume, upload }