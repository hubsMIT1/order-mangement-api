const express = require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const orderRouter = require('./routes/order');
const User = require('./models/user');
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
// connect to the MongoDB database
const db_url = process.env.MONGO_URL;
mongoose.connect(`${db_url}/order-management-system`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

app.get('/',(req,res)=>{
    res.send('<a href="/order"> Server is RUNNING... </a>')
})

app.use('/order', orderRouter);

app.post('/user', async (req, res, next) => {
    try {
      // validate the request body
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already taken' });
      }
  
      // create a new user
      const user = new User({ name, email, password });
      await user.save();
  
      // send the response
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      next(error);
    }
  })
// handle errors
app.use(function (req, res, next) {
  res.status(404).json({ message: 'Not found' });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 3000;

// start listening to the port
app.listen(PORT, function () {
  console.log(`Server is running http://localhost:${PORT}`);
});
