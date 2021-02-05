import React from 'react';
const API_KEY = "9357f4b4"; 
const URL_API = "https://api.hgbrasil.com/finance"; 

function App() {
  const [data, setData] = React.useState(null); 
  const [value, setValue] = React.useState(""); 
  const [currency, setCurrency] = React.useState(""); 
  const [valueConverted, setValueConverted] = React.useState(""); 
  const currencies= [{
    "currency": "USD",
    "pt_br_name": "Dólar Americano", 
    "flag": "us"
  },{
    "currency": "ARS",
    "pt_br_name": "Peso Argentino",
    "flag": "ar"
  }, 
  {
    "currency": "AUD",
    "pt_br_name": "Dólar Australiano", 
    "flag": "au" 
  }, 
  {
    "currency": "BTC",
    "pt_br_name": "Bitcoin"
  }, 
  {
    "currency": "CAD",
    "pt_br_name": "Dólar Canadense",
    "flag": "ca"
  }, 
  {
    "currency": "CNY",
    "pt_br_name": "Renminbi",
    "flag": "cn"
  }, 
  {
    "currency": "EUR",
    "pt_br_name": "Euro",

  }, 
  {
    "currency": "GBP",
    "pt_br_name": "Iene",
    "flag": "jp"
  }];

  const handleApi = async () => 
  {
    const response = await fetch(`${URL_API}?format=json-cors&key=${API_KEY}`); 
    const json = await response.json();
    
    setData(json.results.currencies);
      
  }
  React.useEffect(()=>
  {
    handleApi();
  }, []); 
 
  const handleConvert = (event) => 
  {
    event.preventDefault(); 
    setValueConverted(data[currency].buy * value); 
  }

  const formatCurrency = (value) => 
  {
    return value.toLocaleString('pt-BR', 
    {
        style: "currency", 
        currency: "BRL"
    })
  };

  if(data)
  {
    return (
      <div>
        {valueConverted !== "" ? <p>{formatCurrency(valueConverted)}</p> : null}
        <form onSubmit={handleConvert}>
          <input type="number" value={value} onChange={({target}) => setValue(target.value)}/>
          <select value={currency} onChange={(({target})=> setCurrency(target.value))} required>
            <option value="" disabled>
              Selecione
            </option>
            {currencies.map((currencyOption) => 
            {
              return <option key={currencyOption.currency}value={currencyOption.currency}>
                        {currencyOption.pt_br_name}
                      </option>
                   
            })}
          </select>
          <button>Converter</button>
        </form>
        {data && <div>{currencies.map((currencies, index) => 
        {
          
         return <p key={index}> 
                  Moedas: {currencies.pt_br_name} <br/>
                  Cotação Atual: {formatCurrency(data[currencies.currency].buy)} <br/>
                  <span> Variação: {data[currencies.currency].variation}</span>
                  <img src={`https://www.countryflags.io/${currencies.flag}/flat/64.png`} alt={currencies.pt_br_name} />
                </p>
        })}</div>}
      </div>
    );
  }
  else 
  {
    return <div> Wait a second!</div>
  }
  
}

export default App;
