import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
        },
         isActive: {
       type: Boolean,
       default: true,
    },
    },{
        timestamps:true
    }
)

const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);

export default ProductCategory;