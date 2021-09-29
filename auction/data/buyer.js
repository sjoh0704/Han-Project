import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';

const buyerSchema = new Mongoose.Schema({
    buyer_id:Number,
    seller_id: {type:Number, required: true},
    price: {type: Number, required: true},
    product_id: {type: Number, rqeuired: true},
},{timestamps: true , versionKey: false}
);

useVirtualId(buyerSchema);
const Buyer = Mongoose.model('Buyer', buyerSchema);




export async function getAll() {
    return Buyer.find().sort({createdAt: -1});
    } // 역순으로 전체상품



export async function getById(id) {
    return Buyer.findById(id);
    }  // 상품 아이디 받아서 해당 상품 검색

export async function getAllBybuyerid(id) {
    return Buyer.find({id})
    }     // 셀러아이디 받아서 해당 셀러아이디 상품 검색


    
export async function create(buyer_id,seller_id, price, product_id){
    return new Buyer({
        buyer_id,
        seller_id, 
        price, 
        product_id,
    }).save()
//상품 생성하고 저장
}
