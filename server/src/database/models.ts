import {TaskSchema} from "./schemas";
const mongoose = require("mongoose");

export const Task = mongoose.model("Task", TaskSchema);
