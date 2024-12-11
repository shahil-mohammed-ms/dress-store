const Address = require('../models/address')

const getAddress = async (req, res) => {
  try {
    const { _id } = req?.decoded
    console.log('id: ',_id)
    const data = await Address.find({ userId:_id })
 
    console.log('datas: ',data)
    res.status(200).json({ data,message:'successful' })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};
   
const addAddress = async (req, res) => {
  const {   name,addressLine, city, state, pin } = req?.body
 // const userId = '66796d0936bb97720a7764f4';
 const { _id } = req?.decoded

 const isExisting = await Address.find({
  userId:_id
});
let SetPrimaryTrue = false;
if(isExisting.length <=0) SetPrimaryTrue=true

  try {
    const data = await Address.create({
      userId:_id, name,addressLine, city, state, pin , primary:SetPrimaryTrue
    })
    res.status(201).json({ data, message: 'Address created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const updateAddress = async (req, res) => {
  const { _id, firstname, lastname, country, address_line_1, address_line_2, city, state, zip, mobile, primary,type } = req?.body
  try {
    const data = await Address.updateOne({ _id },
      { $set: { firstname, lastname, country, address_line_1, address_line_2, city, state, zip, mobile, primary,type }})
    res.status(201).json({ data, message: 'Address updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const deleteAddress = async (req, res) => {
  try {
    const id = req.params.id
   const data= await Address.deleteOne({ _id: id });
    res.status(200).json({ message: 'Address deleted successfully',data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}
 const setPrimaryAddress = async (req, res) => {
  const {   addressId } = req.body;
  console.log(req.body)
 // const userId = '66796d0936bb97720a7764f4';
 const { _id } = req?.decoded
 console.log(_id)
  try {
      // Set all addresses' primary to false for the user
      await Address.updateMany(
          { userId: _id, primary: true },
          { primary: false }
      );

      // Set the selected address' primary to true
      const updatedAddress = await Address.findByIdAndUpdate(
          addressId,
          { primary: true },
          { new: true }
      );

      if (!updatedAddress) {
          return res.status(404).json({ message: 'Address not found' });
      }

      res.status(200).json({ message: 'Primary address updated successfully', address: updatedAddress });
  } catch (error) {
      console.error('Error updating primary address: ', error);
      res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    getAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    setPrimaryAddress,
  }