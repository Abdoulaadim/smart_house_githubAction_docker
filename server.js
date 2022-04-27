const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/smarthouse'));

app.all('*', (req, res) => {

    res.status(200).sendFile(path.join(__dirname + '/dist/smarthouse/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);