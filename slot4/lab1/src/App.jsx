import ProductInfo from './components/ProductInfo';

function App() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <ProductInfo 
        name="Pizza Margherita" 
        price={12.99} 
        tag="Hot" 
        avatar="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" 
      />
    </div>
  );
}

export default App;