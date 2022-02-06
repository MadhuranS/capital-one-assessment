const express = require('express')
const calculatePoints = require('./src/calculatePoints')

const app = express();
app.use(express.json({ extended: false })); //needed to get data in req.body

app.get('/', (req, res) => {
  try {
    const points = calculatePoints(req.body.transactions)
    res.json({points: points})
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))