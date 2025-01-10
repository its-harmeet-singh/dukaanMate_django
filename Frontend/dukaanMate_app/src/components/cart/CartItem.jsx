import { useEffect, useState } from "react"
import api, { BASE_URL } from "../../api"
import { toast } from "react-toastify"


const CartItem = ({item, setCartTotal, cartItems, setNumberOfCartItems, setCartItems}) => {

  const [quantity, setQuantity] = useState(item.quantity)
  const[loading, setLoading] = useState(false)
  const itemData = {quantity: quantity, item_id: item.id}
  const itemID = {item_id : item.id}

  function deleteCartItem(){
    const confirmDelete = window.confirm("Are you sure you want to delete this product")

    if(confirmDelete){
      api.post("delete_cartitem/", itemID)
      .then(res => {
        console.log(res.data)
        toast.success("Product removed from the cart.")
        setCartItems(cartItems.filter(cartItem => cartItem.id != item.id))

        setCartTotal(cartItems.filter((cartItem) => cartItem.id != item.id)
        .reduce((acc, curr) => acc + curr.total, 0))

        setNumberOfCartItems(cartItems.filter((cartItem) => cartItem.id != item.id).
        reduce((acc, curr) => acc + curr.quantity, 0))

      })
      .catch(err => {
        console.log(err.message)
      })
    }
  }

  function updateCartItem(){
    setLoading(true)
    api.patch("update_quantity/", itemData)
    .then(
      res =>{
        console.log(res.data.data)
        setLoading(false)
        toast.success("Cart Item updated successfully.")
        setCartTotal(cartItems.map((cartItem) => cartItem.id == item.id ? res.data.data : cartItem)
        .reduce((acc, curr) => acc + curr.total, 0))

        setNumberOfCartItems(cartItems.map((cartItem) => cartItem.id === item.id ? res.data.data : cartItem).
        reduce((acc, curr) => acc + curr.quantity, 0))

      })
    .catch(err =>{
      setLoading(false)
      console.log(err.message)
    })
  }


  return (
    <div className="col-md-12">
          
          <div
            className="cart-item d-flex align-items-center mb-3 p-3"
            style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}
          >
            <img
              src={`${BASE_URL}${item.product.image}`}
              alt="Product Image"
              className="img-fluid"
              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }}
            />
            <div className="ms-3 flex-grow-1">
              <h5 className="mb-1">{item.product.name}</h5>
              <p className="mb-0 text-muted">{`$${item.product.price}`}</p>
            </div>
            <div className="d-flex align-items-center">
              <input
                type="number"
                min="1"
                className="form-control me-3"
                value = {quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ width: '70px' }}
              />
              <button className="btn btn-sm mx-2" 
                onClick={updateCartItem}
               style={{backgroundColor: "#4b3bcb", color:"white"}} disabled={loading}>
                {loading ? "Updating" : "Update"}
                </button>
              <button className="btn btn-danger btn-sm" onClick={deleteCartItem}>Remove</button>
            </div>
          </div>

        </div>
  )
}

export default CartItem
