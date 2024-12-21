import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        title: String,
        description: String,
        published: Boolean,
    },
    { timestamps: true },
);

export const Tutorial = mongoose.model("tutorial", schema);
