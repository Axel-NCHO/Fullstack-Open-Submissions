/* eslint-disable no-underscore-dangle -- used as default in mongodb */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ]
});

userSchema.set("toJSON", {
    transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;

        // The password hash should never be revealed
        delete ret.passwordHash;
    }
});

const User = mongoose.model("User", userSchema);

export default User;

/* eslint-enable no-underscore-dangle -- used as default in mongodb*/
