import express from 'express'
const app = express()
const port = 3001

app.get('/health', (req, res) => {
 res.status(200).json({
    status: 'OK'
 })
})

app.listen(port, () => {
  console.log(`express is running on port : ${port}`)
})
