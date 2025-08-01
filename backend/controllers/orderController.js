import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "https://food-del-frontend-dhw7.onrender.com";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: req.body.paymentMethod === "cod" ? true : false,
      paymentMethod: req.body.paymentMethod
});

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

      // If payment method is COD, just respond success immediately
    if (req.body.paymentMethod === "cod") {
      return res.json({ success: true, message: "Order placed with COD" });
    }

    // Otherwise, continue with Stripe payment flow
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100 * 80),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delievery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (success === "true") {
      if (order.payment === false) {
        await orderModel.findByIdAndUpdate(orderId, { payment: true });
      }
      return res.json({ success: true, message: "Payment confirmed" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment failed, order deleted" });
    }
  } catch (error) {
    console.error("Error in verifyOrder:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//user order for frontend
const userOrders = async (req, res)=> {
  try {
    const orders = await orderModel.find({userId:req.body.userId})
    res.json({success:true, data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"}); 
  }
}

//listing orders for admin
const listOrders = async(req,res)=>{
  try {
    const orders= await orderModel.find({});
    res.json({success:true, data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"}) 
  }
}

//api for updating order status
const updateStatus = async(req, res) =>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true, message:"Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
