import useCartData from "../../hooks/useCartData"
import OrderSummary from "./OrderSummary"
import PaymentSection from "./PaymentSection"

const CheckoutPage = () => {

  const  {cartitems, productCount, setCartItems, cartTotal, setCartTotal, loading, tax} = useCartData()

  return (
    <div className="container my-3">

      <div className="row">
        <OrderSummary cartitems = {cartitems} cartTotal={cartTotal} tax = {tax} />
        <PaymentSection />
      </div>
    </div>
  )
}

export default CheckoutPage







