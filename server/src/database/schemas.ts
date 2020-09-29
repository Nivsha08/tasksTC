const mongoose = require("mongoose");
const { Schema } = mongoose;

const TASK_TITLE_MAX_LENGTH = 96;

export const TaskSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        maxlength: TASK_TITLE_MAX_LENGTH,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});
