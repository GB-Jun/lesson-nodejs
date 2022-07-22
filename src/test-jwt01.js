require('dotenv').config();

const jwt = require('jsonwebtoken');

const token = jwt.sign({id:13, account:'black', password:'123456'}, process.env.JWT_SECRET)

console.log(token)


// 會自動給一個timestamp所以每次生出來的會不一樣

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImFjY291bnQiOiJibGFjayIsImlhdCI6MTY1ODMwMTc3OH0.ZeTTVHrwbWBQHgcq6GHVBNltukNIUXeu4ybQmIlFN8o

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImFjY291bnQiOiJibGFjayIsImlhdCI6MTY1ODMwMTc4OH0.EIOGWCJ45MMcD0EYYmtmyq0k-ath8hPWD3xwcltBaEQ 