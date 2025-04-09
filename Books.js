const mongoose = require("mongoose")



main().then((res)=>console.log("Connection Sucsesfull")).catch(err=>console.log(err))

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/books")

}


const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:20
    },
    author:String,
    price:{
        type:Number,
        min:[1,"Price is to low for amazon Selling"]
    }
})

const Book = mongoose.model("Book",bookSchema)


// const book1 = new Book({
//     title:"This is me ",
//     author:"dawood alam",
//     price:"-2000"
// })

Book.findByIdAndUpdate("67f5e1fcfabeb7eee1c8a509",{price:-500},{ runValidators: true }).then(res=>console.log(res)).catch(err=>console.log(err))