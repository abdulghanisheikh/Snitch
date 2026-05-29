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
        required: false
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId;
        },
        select: false
    },
    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer"
    },
    googleId: {
        type: String
    }
});

// hashing password before saving into db
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