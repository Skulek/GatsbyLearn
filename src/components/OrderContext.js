import React, { useState } from 'react';

// Create a order context
const OrderContext = React.createContext();

export function OrderProvider({ children }) {
  // we need to stick state in here
  const [order, setOrder] = useState([]);
  console.log(order);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;
