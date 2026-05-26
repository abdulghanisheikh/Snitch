import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    }
});

// hashing password before saving in db
userSchema.pre("save", async function() {
    // this -> userSchema

    if(!this.isModified("password")) {
        return;
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
});

userSchema.methods.comparePasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("user", userSchema);
export default User;