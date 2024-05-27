import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);

const movieSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    trailer: {
      type: String,
      required: true,
    },
    directors: [
      {
        type: String,
        required: true,
      },
    ],
    actor: [
      {
        type: String,
        required: true,
      },
    ],
    releaseDate: {
      //ngày phát hành
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    duration: {
      // thời lượng phim
      type: Number,
      required: true,
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
    ageRestriction: {
      // giới hạn độ tuổi
      type: Number,
      required: true,
    },
    views: {
      type: Number
    },
    rate: {
      type: Number
    },
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Movie", movieSchema);
