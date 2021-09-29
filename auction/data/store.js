import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';
const productSchema = new Mongoose.Schema({
    seller_id: {type:Number, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    area: {type: String, required:true},
    description: {type: String, required: true},
    finish: {type : Boolean, default: false},
    buyer_id: Number,
    fileurl: Array,
},{timestamps: true , versionKey: false}
);

useVirtualId(productSchema);
const Product = Mongoose.model('Product', productSchema);




export async function getAll() {
    return Product.find().sort({createdAt: -1});
    } // 역순으로 전체상품



export async function getById(id) {
    return Product.findById(id);
    }  // 상품 아이디 받아서 해당 상품 검색

export async function getAllBysellerid(seller_id) {
    return Product.find({seller_id})
    }     // 셀러아이디 받아서 해당 셀러아이디 상품 검색



    
export async function create(seller_id, name, fileurl, price, description, area){
   return new Product({
        seller_id, 
        name, 
        price, 
        description,
        fileurl,
        area,
    }).save()
    
    

    
    
//상품 생성하고 저장
}


export async function updateplus(id, buyer_id, price ){ // price 받아서 10% 인상하고 buyer_id 설정
    
    return Product.findByIdAndUpdate(id, {price:parseInt(price*1.1),buyer_id},{ returnOriginal : false});
}

export async function update(id, fileurl, name,price, description, finish, area){
    console.log('넘어온거 확인', finish); // 상품 수정
    return Product.findByIdAndUpdate(id, {fileurl,name,price,description, finish,area}, { returnOriginal : false});
}
export async function remove(id){ // 상품 삭제
    return Product.findByIdAndDelete(id)    
}
