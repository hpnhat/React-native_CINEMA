import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    maxColumns: {
      type: Number,
      required: true,
    },
    maxRows: {
      type: Number,
      required: true,
    },
    rows: [
      {
        nameSeat: {
          type: String,
          required: true,
        },
        index: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: ["Standard", "Couple", "VIP"],
        },
        seats: [
          {
            area: {
              // dùng để phẩn biệt khu vực chỗ ngồi
              type: Number,
              required: true,
            },
            column: {
              type: Number,
              required: true,
            },
            row: {
              type: Number,
              required: true,
            },
            status: {
              type: Number,
              required: true,
              default: 0, //  0 means available
            },
            ticketPrice: {
              type: Number,
              required: true,
              min: 0,
            },
            description: {
              type: String,
              required: true,
            },
            seatsInGroup: [
              {
                area: {
                  type: Number,
                  required: true,
                },
                row: {
                  type: Number,
                  required: true,
                },
                column: {
                  type: Number,
                  required: true,
                },
              },
            ],
          },
        ],
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Room", roomSchema);
