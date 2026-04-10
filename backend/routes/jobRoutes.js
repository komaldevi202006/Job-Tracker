const express = require('express')
const router = express.Router()
const { getJobs, addJob, updateJob, deleteJob, uploadResume, upload } = require('../controllers/jobController')
const authMiddleware = require('../middleware/auth')

router.use(authMiddleware)

router.get('/', getJobs)
router.post('/', addJob)
router.put('/:id', updateJob)
router.delete('/:id', deleteJob)
router.post('/:id/resume', upload.single('resume'), uploadResume)

module.exports = router