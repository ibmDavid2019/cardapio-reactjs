import React, { useState } from 'react';
import './App.css';
import './styles/output.css';

const menuItems = [
  {
    id: 1,
    name: "Hamburguer Smash",
    image: "/assets/hamb-1.png",
    price: 18.90,
    description: "Pão levinho de fermentação natural de Trigou, burger 160g, queijo prato e maionese da casa."
  },
  {
    id: 2,
    name: "Hamburguer Duplo",
    image: "/assets/hamb-2.png",
    price: 32.90,
    description: "Pão levinho de fermentação natural de Trigou, 2 burgers de 160g, queijo prato e maionese da casa."
  },
  {
    id: 3,
    name: "Hamburguer Salad",
    image: "/assets/hamb-3.png",
    price: 35.90,
    description: "Pão levinho de fermentação natural de Trigou, burger 160g, queijo prato, alface, tomate fresco e maionese da casa."
  },
  {
    id: 4,
    name: "Hamburguer da casa",
    image: "/assets/hamb-4.png",
    price: 30,
    description: "Pão levinho de fermentação natural de Trigou, burger 160g, queijo prato, bacon crocante e maionese da casa."
  }
];

const drinks = [
  {
    id: 5,
    name: "Coca lata",
    image: "/assets/refri-1.png",
    price: 6
  },
  {
    id: 6,
    name: "Guaraná lata",
    image: "/assets/refri-2.png",
    price: 6
  }
];

const allItems = [...menuItems, ...drinks];

function App() {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [addressWarning, setAddressWarning] = useState(false);

  const addToCart = (name, price) => {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.name === name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { name, price, quantity: 1 }]);
    }
  };

  const removeFromCart = (name) => {
    setCart(cart.filter(item => item.name !== name));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (!address.trim()) {
      setAddressWarning(true);
      return;
    }
    alert(`Pedido finalizado!\nEndereço: ${address}\nTotal: R$ ${calculateTotal().toFixed(2)}`);
    setCart([]);
    setAddress("");
    setShowModal(false);
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="App">
      {/* HEADER */}
      <header className="w-full h-[420px] bg-zinc-900 bg-home bg-cover bg-center">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <img 
            src="/assets/hamb-1.png"
            alt="Logo DevBurguer"
            className="w-32 h-32 rounded-full shadow-lg hover:scale-110 duration-200"
          />
          <h1 className="text-4xl mt-4 mb-2 font-bold text-white">Dev Burguer</h1>
          <span className="text-white font-medium">Rua dev 10, Joinville - SC</span>
          
          <div className="bg-green-600 px-4 py-1 rounded-lg mt-5">
            <span className="text-white font-medium">Terça - 15:00 as 22:00</span>
          </div>
        </div>
      </header>

      {/* MENU SECTION */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mt-9 mb-6">
        Conheça nosso menu
      </h2>

      {/* LISTA DE PRODUTOS */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-10 mx-auto max-w-7xl px-2 mb-16">
        {allItems.map(item => (
          <div key={item.id} className="flex gap-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-28 h-28 rounded-md hover:scale-100 hover:-rotate-2 duration-300"
            />
            <div>
              <p className="font-bold">{item.name}</p>
              {item.description && <p className="text-sm">{item.description}</p>}
              <div className="flex items-center gap-2 justify-between mt-3">
                <p className="font-bold text-lg">R$ {item.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(item.name, item.price)}
                  className="bg-gray-900 px-5 rounded add-to-cart-btn"
                >
                  <i className="fa fa-cart-plus text-lg text-white"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* MODAL CART */}
      {showModal && (
        <div className="bg-black/60 w-full h-full fixed top-0 left-0 z-[99] flex items-center justify-center">
          <div className="bg-white p-5 rounded-md min-w-[90%] md:min-w-[600px] max-h-[80vh] overflow-y-auto">
            <h2 className="text-center font-bold text-2xl mb-2">Meu carrinho</h2>

            <div className="flex justify-between mb-2 flex-col">
              {cart.length === 0 ? (
                <p className="text-center py-4">Carrinho vazio</p>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex items-center justify-between mb-4 pb-4 border-b">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p>Qtd: {item.quantity}</p>
                      <p className="font-medium mt-2">R$ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Remover
                    </button>
                  </div>
                ))
              )}
            </div>

            <p className="font-bold">Total: <span>R$ {calculateTotal().toFixed(2)}</span></p>

            <p className="font-bold mt-4">Endereço de entrega:</p>
            <input
              type="text"
              placeholder="Digite seu endereço completo..."
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setAddressWarning(false);
              }}
              className="w-full border-2 p-1 rounded my-1"
            />
            {addressWarning && (
              <p className="text-red-500">Digite seu endereço completo!</p>
            )}

            <div className="flex items-center justify-between mt-5 w-full">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-1 rounded"
              >
                Fechar
              </button>
              <button
                onClick={handleCheckout}
                className="bg-green-500 text-white px-4 py-1 rounded"
              >
                Finalizar pedido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER CART BUTTON */}
      <footer className="w-full bg-red-500 py-3 fixed bottom-0 z-40 flex items-center justify-center">
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 text-white font-bold"
        >        
          ({cartCount})
          Veja meu carrinho
          <i className="fa fa-cart-plus text-lg text-white"></i>
        </button>
      </footer>
    </div>
  );
}

export default App;
