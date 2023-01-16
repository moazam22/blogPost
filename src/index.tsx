import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';


const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' })

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors){

    const unauthorized = graphQLErrors.find(
      (error) => (error.message === 'invalid token')
    );

    const forbidden = graphQLErrors.find(
      (error) => (error.message === 'jwt expired')
    );

    if (unauthorized || forbidden) {
      // Perform logout logic
      localStorage.removeItem('user');
      // Redirect to login page
      window.location.replace('/login');
      // console.log('it should logout here');
      // const navigate = useNavigate();
      // navigate('/login');
    }
    
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const user = localStorage.getItem('user');
  const token = !!user ? JSON.parse(user)?.access_token : null;  // get the authentication token from local storage if it exists

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([ authLink, errorLink, httpLink ]),
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
   </React.StrictMode>  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();