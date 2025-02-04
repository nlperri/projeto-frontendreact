import { useEffect, createContext, useState, useContext } from 'react';

import { SidebarContext } from '../contexts/SidebarContext';
import { CheckoutContext } from './CheckoutContext';
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { setOpen, handleClose } = useContext(SidebarContext);
  const { formPage } = useContext(CheckoutContext);

  useEffect(() => {
    if (formPage === 4) {
      clearCart();
    }
  }, [formPage]);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const cartStorage = localStorage.getItem('cart');
    if (cartStorage) {
      setCart(JSON.parse(cartStorage));
    }
  }, []);

  const addToCart = (product, id) => {
    setOpen(true);
    const newProduct = { ...product, amount: 1 };
    const cartProduct = cart.find((item) => {
      return item.id === id;
    });
    if (cartProduct) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartProduct.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newProduct]);
    }
  };

  const removeProduct = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);

    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    handleClose();
  };

  const plusAmount = (id) => {
    const product = cart.find((item) => item.id === id);
    const newProduct = { ...product, amount: 1 };
    const cartProduct = cart.find((item) => {
      return item.id === id;
    });
    if (cartProduct) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartProduct.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newProduct]);
    }
  };

  const menusAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id;
    });

    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }
    if (cartItem.amount < 2) {
      removeProduct(id);
    }
  };

  const cartAmount = (cart) => {
    let totalAmount = 0;
    cart.map((item) => {
      totalAmount += item.amount;
    });
    return totalAmount;
  };

  const subTotal = (cart) => {
    let totalPrice = 0;
    cart.map((item) => {
      totalPrice += item.price * item.amount;
    });
    return totalPrice;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeProduct,
        clearCart,
        plusAmount,
        menusAmount,
        cartAmount,
        subTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
