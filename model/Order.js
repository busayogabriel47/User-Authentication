import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        products: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        amount: {type: String, required: true},
        address: {type: Object, required: true},
        status: {type: String, default: "pending"},
    },
    {timestamps: true}
)

const order = mongoose.model("Order", OrderSchema);

export default order;