const express = require('express');
const cors = require('cors');
const scoresRouter = require('./routes/scores');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/scores', scoresRouter);

// TODO (workshop): Add shop route
// const shopRouter = require('./routes/shop');
// app.use('/api/shop', shopRouter);

app.listen(PORT, () => {
  console.log(`🧙 Backend running at http://localhost:${PORT}`);
});
