import userModel from "../models/userModel.js";


//Add to user cart
const addToCart = async (req, res) => {

  const itemId = req.body.itemId || req.body.id;


  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


//remove items from user cart
const removeFromCart = async (req, res) => {
 
  const itemId = req.body.itemId || req.body.id;


  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      // Decrease quantity or delete if quantity is 1
      if (cartData[itemId] > 1) {
        cartData[itemId] -= 1;
      } else {
        delete cartData[itemId];
      }

      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      res.json({ success: true, message: "Removed from Cart" });
    } else {
      res.json({ success: false, message: "Item not in cart" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//fetch user cart data
const getCart = async (req, res) => {

  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export {addToCart,removeFromCart,getCart}