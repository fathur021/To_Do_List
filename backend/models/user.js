const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required: true,
            trim:true
        },
        email: {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6,
            select:false,
        },
        refreshToken: {
            type:String,
            select:false
        }
    },

    {timestamps:true}
);
// Hash password sebelum save
userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,10);
});
// Method compare password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.removeRefreshToken = function(){
    this.refreshToken = null;
    return this.save();
}


module.exports = mongoose.model("User",userSchema);