import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        country: {type: String, required: false},
        state: {type: String, required: false},
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {timestamps: true}
)

const User = mongoose.model("User", UserSchema);

export default User;