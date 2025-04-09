const mongoose = require("mongoose")
const Chat = require("./Models/Chats")
main().then((res)=>console.log("Connected to DB")).catch((err)=>console.log(err))
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}

const fakeMessages = [
    {
      form: "Ayaan",
      to: "Fatima",
      msg: "Let's catch up this weekend!",
      created_at: new Date()
    },
    {
        form: "Hassan",
      to: "Tariq",
      msg: "Project file is ready. Check your email.",
      created_at: new Date()
    },
    {
        form: "Laiba",
      to: "Zunair",
      msg: "I'm almost done with the assignment!",
      created_at: new Date()
    },
    {
        form: "Nimra",
      to: "Bilal",
      msg: "Meeting has been moved to 3 PM.",
      created_at: new Date()
    },
    {
        form: "Raza",
      to: "Iqra",
      msg: "Good luck for your presentation!",
      created_at: new Date()
    }
  ];
  

Chat.insertMany(fakeMessages)