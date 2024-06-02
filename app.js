const express = require('express')
const bodyParse = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000
app.use(bodyParse.urlencoded({extended:false }))
app.use(bodyParse.json())

// my sql
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student_data',
    
})
// get all
app.get('',(req,res) =>{
    pool.getConnection((err, connection) =>
{
    if(err) throw err
    console.log(`connection as id ${connection.threadId}`)

    connection.query('SELECT * from rtu_data', (err, rows) => {
        connection.release() // return the connection to pool

        if(!err){
            res.send(rows)
        }else{
            console.log(err)
        }
  })
 })
})


// get this by id
app.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connection as id ${connection.threadId}`)

        connection.query('Select * from rtu_data WHERE id =?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })
      }
    )   
  }
)

// listen on enviroment port
app.listen(port, () => console.log(`Listen on port ${port}`))