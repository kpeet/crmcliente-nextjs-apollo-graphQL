import { ApolloClient, HttpLink, createHttpLink , InMemoryCache} from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context'


const httpsLink = createHttpLink({
    uri: 'http://localhost:4000',
    fetch
})


const authLink = setContext((_, {headers}) => {

    //Leer el storage
    const token = localStorage.getItem('token')

    return {
        headers:{
            ... headers,
            autorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat( httpsLink )


});

const client_sin_autenticacion = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://localhost:4000',
        fetch
    })


});

export default client;