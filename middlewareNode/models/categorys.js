const mongoose = require('mongoose')
const { Schema, model } = mongoose

const categorySchema = new mongoose.Schema(
{
  
  categoryName: {
    type: String,
    required: true,
  },
  catId: {
    type: String,
    required: false,
    unique: true,
  },
}

)
console.log(categorySchema);

module.exports =  categorys = model('categorys', categorySchema)