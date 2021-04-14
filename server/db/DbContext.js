import GalaxySchema from "../models/Galaxy";
import mongoose from "mongoose";

class DbContext {
  Galaxy = mongoose.model("Galaxy", GalaxySchema);
}

export const dbContext = new DbContext();
