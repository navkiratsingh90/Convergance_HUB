import express from 'express'

const Router = express.Router()

Router.post('/create')
Router.get('/get')
Router.get('/get/:id')
Router.put('/update/:id')
Router.put('/addMember')
Router.delete('/delete/:id')



export default Router