const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const connectDb = require('./config/collectdb')
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const orderRoute = require('./routes/orderRoute')

    
//  app.use(bodyParser)
 app.use(express.json())

connectDb();

app.use('/api', productRoute)
app.use('/api', userRoute)
app.use('/api', orderRoute)


app.listen(3004, () => {
    console.log('Server is listning in port 3000');
})