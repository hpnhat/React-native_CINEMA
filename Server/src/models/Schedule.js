import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);

const movieSchema = mongoose.Schema(
  {
    showDateTime: {
      type: String,
      required: true,
    },
    showTime: {
      type: String,
      required: true,
    },
    cinema: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cinema",
      required: true,
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    showTime: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Movie", movieSchema);
