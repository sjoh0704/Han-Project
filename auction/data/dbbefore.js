
let products = [
    {
        id:Date.now().toString(),
        seller_id:'1', 
        name:'경매상품입니다', 
        price:'10000', 
        createdAt: new Date(),
        description:'설명입니다',
        fileurl: '/logo192.png',
        finishdate:  (new Date().getMonth()+1)+ '월-' + new Date().getDate()+ '일  ' +(new Date().getHours()+6)+ ':' + new Date().getMinutes()+ ':' +new Date().getSeconds(),
        buyer_id: '아직 입찰자 없음',
    },
    {
        id:Date.now()+'1'.toString(),
        seller_id:'2', 
        name:'박성훈입니다', 
        price:'50000', 
        createdAt: new Date(),
        fileurl: '/logo192.png',
        description:'디스크립션인가요',
        finishdate:(new Date().getMonth()+1)+ '월-' + new Date().getDate()+ '일  ' +(new Date().getHours()+6)+ ':' + new Date().getMinutes()+ ':' +new Date().getSeconds(),
        buyer_id: '아직 입찰자 없음',
    },
];



export async function getAll() {
    return products
    }



export async function getById(id) {
    const found = products.filter((product) => product.id === id);
    if(!found){            
        return null;
    }
    return found
    } 


export async function create(seller_id, name, fileurl, price, description){
    console.log('file!!',fileurl);
    const product = {
        id: Date.now().toString(),
        seller_id,
        name,
        price,
        fileurl,
        time: '12:00',
        description,
        createdAt: new Date(),
        buyer_id: '아직입찰자없음',
        finishdate:(new Date().getMonth()+1)+ '월-' + new Date().getDate()+ '일  ' +(new Date().getHours()+6)+ ':' + new Date().getMinutes()+ ':' +new Date().getSeconds(),
    };
    products = [product, ...products];
    return getById(product.id);
}

export async function updateplus(id, buyer_id){
    
    const product = products.find((product) => product.id === id);
    
    if(product){
        product.buyer_id = buyer_id;
        product.price = (parseInt(product.price*1.1));
    } 
    return getById(product.id);
}

export async function update(id, fileurl, seller_id, name, price, description){
    
    const product = products.find((product) => product.id === id);
    console.log(product);
    if(product){
        product.fileurl = fileurl;
        product.name = name;
        product.price = (parseInt(price));
        product.description = description;
        product.seller_id = seller_id;
    } 
    return null;
}
export async function remove(id){ 
    console.log('id',id,);
        products = products.filter((product) => product.id !== id);
}
