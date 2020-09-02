const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {
	startDatabase
} = require('./database/mongo-common');
const app = express();

//Middleware
app.use(helmet())
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

//API calls
app.use('/api/products', require('./routes/productsRoutes'))

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


// Serve our react homepage if no route is detected
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

startDatabase().then(async () => {
	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => {
		console.log(`Our app is running on port ${PORT}`);
	});
});