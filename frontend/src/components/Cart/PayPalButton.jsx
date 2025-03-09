import React from 'react'

import {PayPalButtons , PayPalScriptProvider} from "@paypal/react-paypal-js"

const PayPalButton = ({amount, onSuccess, onError}) => {
  return (
    
<PayPalScriptProvider options={{"clientId": 
"AT4AEAU2nLngW_TLWFgdmeJrMA_2Hj4_LCmIrZDJX6NZT3AKzxJHsmqXWJreSeVxaTxzMR07ImwiJK_Q"}}>

<PayPalButtons style={{layout : "vertical"}}
createOrder={(data, actions) =>{
  return actions.order.create({
    purchase_units: [{amount: {value: amount}}]
  })
}}
onApprove={(data , actions) => {
  return actions.order.capture().then(onSuccess)
}}
onError={onError} />

</PayPalScriptProvider>

  )
}

export default PayPalButton