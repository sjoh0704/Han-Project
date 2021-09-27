export default function parseDate(tdate) {
  
    const created = new Date(Date.parse(tdate));
    const now = new Date();
    const diff = Math.floor((now - created) / 1000);
    const endtime = 10800
    const endday =new Date(Date.parse(created) + (endtime * 1000))
    if (diff < endtime) {
      
      return `${endday.toLocaleString()}에 경매가 종료됩니다`
    }
    return   '경매 종료된 상품입니다 수정, 삭제가 불가능합니다'
  }
  