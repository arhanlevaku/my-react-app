import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";



/*const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;
function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}
*/

const client = new ApolloClient({
  uri: 'https://sg8mqd4y4d.execute-api.us-east-1.amazonaws.com/dev/',
  //uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const EXCHANGE_RATES = gql`
query Users {
  users {
    id
    name
    comment
  }
}
`;



function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.users.map(({ id, name, comment }) => (
    <div key={id} >
      <p>
          {name} : {comment}
      </p>
    </div>
  ));
}

function Dogs({ onDogSelected }) {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
    <label for="user">Pl. choose your customized message:</label>
    
    <select name="user" onChange={onDogSelected}>
        {data.users.map(user => (
        <option key={user.id} value={user.comment}>
         {user.name}
        </option>
      ))}
    </select> 
    </>
  );
}

function App() {
  const [selectedDog, setSelectedDog] = useState(null);

  function onDogSelected({ target }) {
    setSelectedDog(target.value);
  }

  return (
    <div>
      
      
      <div style={{display: 'inline-block', margin:10}}>
      <h2>Thank you messages!!</h2>
      <Dogs onDogSelected={onDogSelected} />
      <>
      <h3>{selectedDog }</h3>
      </>
      
      </div>
     
    </div>
    
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);