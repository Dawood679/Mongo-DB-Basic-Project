const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require('path');
const Chat = require("./Models/Chats")
var methodOverride = require('method-override')

main().then((res)=>console.log("Connected to DB")).catch((err)=>console.log(err))
async function main(){
    await mongoose.connect('mongodb+srv://dawoodalam057:hfrMaonRDHfMP3zK@cluster1.8qbvd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')
}



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


//Index route

app.get("/chats", async (req,res)=>{
  let chats =  await Chat.find()
  
  res.render("index.ejs",{chats})
})

// to show the form to add new form for new chat
app.get("/chats/new",(req,res)=>{
  res.render("newchat")
})

//to add new data in the database
app.post("/chats",async (req,res)=>{
  let {form,to,msg} = req.body
  let chat1 = await Chat.insertOne({
    form:form,
    to:to,
    msg:msg,
    created_at:new Date("2025-04-07T09:45:00Z")
  })
  chat1.save().then((res)=>console.log(res)).catch((err)=>console.log(err))
  res.redirect("/chats")
})
// to show the form for edit the form
app.get("/chats/:id/edit",async(req,res)=>{
  let {id} = req.params
  let chat = await Chat.findById(`${id}`)
  res.render("Edit.ejs",{chat})
  
})
// put resuest is here
app.put("/chats/:id",async(req,res)=>{
  let {id} = req.params
  let {msg} = req.body
  let chat = await Chat.findByIdAndUpdate(`${id}`,{msg:msg},{runValidators:true})
  console.log(chat)
  res.redirect("/chats")
})

// delete route
app.delete("/chats/:id",async(req,res)=>{
  let {id} = req.params;
  let chat =  await Chat.findByIdAndDelete(`${id}`)
  res.redirect("/chats")
})





app.listen(3000,()=>{
  console.log("app is listning")
})
