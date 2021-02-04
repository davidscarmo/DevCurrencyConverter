import React from 'react';
const API_KEY = "9357f4b4"; 
const URL_API = "https://api.hgbrasil.com/finance"
function App() {
  const [data, setData] = React.useState(null); 
  const moeda= [{
    "currency": "USD",
    "pt_br_name": "Dólar Americano"
  },{
    "currency": "ARS",
    "pt_br_name": "Peso Argentino"
  }, 
  {
    "currency": "AUD",
    "pt_br_name": "Dólar Australiano" 
  }, 
  {
    "currency": "BTC",
    "pt_br_name": "Bitcoin"
  }, 
  {
    "currency": "CAD",
    "pt_br_name": "Dólar Canadense"
  }, 
  {
    "currency": "CNY",
    "pt_br_name": "Renminbi"
  }, 
  {
    "currency": "EUR",
    "pt_br_name": "Euro"
  }, 
  {
    "currency": "GBP",
    "pt_br_name": "Iene" 
  }];

  const handleApi = async () => 
  {
    const response = await fetch(`${URL_API}?format=json-cors&key=${API_KEY}`); 
    const json = await response.json();
    
    console.log(json.results.currencies);
    setData(json.results.currencies);
      
  }
  React.useEffect(()=>
  {
    handleApi();
  }, []); 
 
  return (
    <div>

      {data && <div>{moeda.map((moeda, index) => 
      {
        
       return <p key={index}> 
                Moeda: {moeda.pt_br_name} <br/>
                Valor Atual: {data[moeda.currency].buy} <br/>
              </p>
      })}</div>}
    </div>
  );
}

export default App;
