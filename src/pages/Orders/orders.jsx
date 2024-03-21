import Dexie from 'dexie'
import { useLiveQuery } from "dexie-react-hooks";
import { v4 as uuidv4 } from 'uuid'
export default function Orders(){
    const db = new Dexie('StoreItems')
    db.version(1).stores({
        items: "orderId, productId, name,color, size, price, quantity, subtotal, img"
    })
    const allItems = useLiveQuery(() => db.items.toArray(), []);
    if (!allItems) return null
    function remove(id){
        db.items.delete(id)
    }

    function totalPrice(){
        let total = 0
        for(let i = 0; i< allItems.length; i++){
            total += allItems[i].subtotal
        }
        return total
    }
    
    return(
        <section className="orders">
            <h2>Checkout</h2>
            <p className="thank-you">Thank you. Your order has been received.</p>
            <div className="order-page-details">
                <div className="order-page-id">
                    <p className='order-page-label'>Order number:</p>
                    <p className="order-page-value">{uuidv4().slice(0,8)}</p>
                </div>
                <div className="order-page-date">
                    <p className='order-page-label'>Date:</p>
                    <p className="order-page-value">{new Date().toDateString()}</p>
                </div>
            </div>
            <div className="order-page-total">
                <p className='order-page-label'>Total:</p>
                <p className="order-page-value">${totalPrice()}</p>
            </div>
        </section>
    )
}