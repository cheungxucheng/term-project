const express = require('express');
const app = express();
app.use(express.json())

require('dotenv').config();
require('./routes/auth/auth')(app);
//require('./routes/user/user')(app);
//require('./routes/todos/todos')(app);

const port = process.env.PORT

app.listen(port , () => {
    console.log(`API at http://localhost:${port}`);
});