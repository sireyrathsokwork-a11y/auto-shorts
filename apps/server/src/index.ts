import express from 'express'
import 'dotenv/config';
import generateRouter from './routes/generate.route'
import projectRouter from './routes/project.route'

const app = express()
app.use(express.json())
const port = 3000

app.get('/health',(req, res) => {

 res.status(200).json({
    status: 'OK'
 })
})

app.use('/api/generate', generateRouter)
app.use('/api/projects', projectRouter)
app.listen(port, () => {
  console.log(`express is running on port : ${port}`)
})
