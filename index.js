const express = require('express')
const path = require('path')
const exphbs=require('express-handlebars')
const members=require('./Members')
//const logger = require('./middleware/logger')

const app = express();

//init middleware
//app.use(logger)

app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>res.render('index',{
    title:'Member App',
    members
}))

app.use(express.static(path.join(__dirname, 'public')))

//Menbers api routs
app.use('/api/members',require('./routes/api/members'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`${PORT}`))