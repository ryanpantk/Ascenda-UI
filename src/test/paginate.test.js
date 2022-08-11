import {paginate} from '../components/HotelDisplay/paginate.js';

test('Pagination test', ()=>{
const items = [];
for (let i = 1; i<=100; i++){
    items.push(i);
}
const pageNumber = 5;
const pageSize = 10;
const result = [41,42,43,44,45,46,47,48,49,50];
expect(paginate(items,pageNumber,pageSize)).toEqual(result);
})

