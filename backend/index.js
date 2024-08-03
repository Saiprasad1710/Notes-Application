const express = require('express')
const connectToMongo = require('./db');
var cors = require('cors')
const app = express();


// express
//body parser
app.use(cors())
app.use(express.json());
connectToMongo();

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port {PORT}`));

// connected to mongoDB 
const port = 5000

// app.get('/', (req, res) => {
//   res.send('Hello SaiPrasad!')
// })

//Available routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));


app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})










