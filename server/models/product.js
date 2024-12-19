// const mongoose = require('mongoose')
// const productSchema = new mongoose.Schema({

//     name: {
//         type: String,
//         required: true
//     },
//     subheading: {
//         type: String,
//         required: true
//     },
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "Category"
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     brand: {
//         type: String
//     },
//     tags: {
//         type: String,
//         enum: ["featured", "popular", "limited_time_deal", "most_loved"]
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     stock: {
//         type: Number,
//         required: true
//     },
//     discount: {
//         type: Number,
//         required: true
//     },
//     sale_rate: {
//         type: Number,
//         required: true
//     },
//     image: {
//         type: Array,
//         required:true
//     },
//     isAvailable: {
//         type: Boolean,
//         default: true
//     },
//     rating: {
//         type: Number,
//         default: 0
//     },
//     reviews: {
//         type: Array
//     },
//     benefits:{
//         type:[String]
//     }
// },
// {
//     timestamps: true
// })
// module.exports = mongoose.model('Product', productSchema)
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slugName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    costPrice: {
      type: Number,
      min: 0
    },
    discountPrice: {
      type: Number,
      min: 0
    },
    tax: {
      type: Number,
      min: 0
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0
    },
    stockStatus: {
      type: String,
      enum: ['In Stock', 'Out of Stock', 'Pre-Order'],
      default: 'In Stock'
    },
    reorderLevel: {
      type: Number,
      min: 0
    },
    weight: {
      type: Number,
      min: 0
    },
    shippingCharge: {
      type: Number,
      min: 0
    },
    dimensions: {
      type: String
    },
    category:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Referencing the Category schema
      trim: true,
      required:true
    },
    subCategory: {
      type: String,
      trim: true
    },
    manufacturer: {
      type: String,
      trim: true
    },
    tags: {
      type: [String],
      default: []
    },
    images: {
      type: [String],
      default: []
    },
    dynamicInput: {
      type: Object,
      default: {}
    },
    variantInput: {
      type: [Object],
      default: []
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Product', productSchema);
