const express = require('express');
const app = express()

app.use((req , res , next)=>{
    next();
})
app.get('/', (req , res)=>{
    res.send('home')
})
app.get('/profile', (req , res)=>{
    res.send('profile')
})

app.listen('4000');