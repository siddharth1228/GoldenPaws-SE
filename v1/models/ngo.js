var mongoose=require("mongoose");

var ngoSchema=new mongoose.Schema({
    name: String,
    image: String,
    email:String,
    location:String,
    description: String,
    phone: String
});
module.exports=mongoose.model("Ngo",ngoSchema);