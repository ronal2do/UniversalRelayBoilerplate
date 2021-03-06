import Relay, {
  DefaultNetworkLayer,
} from 'react-relay';

import AnonymousUserToken2 from '../configuration/server/AnonymousUserToken2'
import publicURL from '../configuration/scripts/publicURL'


let UserToken1 = null
let UserToken2 = AnonymousUserToken2

export default class NetworkLayer
{
  static setUserTokens( _UserToken1, _UserToken2 )
  {
    UserToken1 = _UserToken1
    UserToken2 = _UserToken2
  }

  static injectNetworkLayer( )
  {
    const graphQLServerURL = publicURL + '/graphql';

    let headers = { }

    if( UserToken1 != null )
      headers.Cookie = 'UserToken1=' + UserToken1

    if( UserToken2 != null )
      headers.UserToken2 = UserToken2

    // TODO: equivalent of RelayContext.reset( )

    // Uncomment for connection to server in the cloud. Smarter way to do this will be needed.
    // graphQLServerURL = 'http://universal-relay-boilerplate.herokuapp.com/graphql';
    Relay.injectNetworkLayer( new DefaultNetworkLayer(
      graphQLServerURL,
      { headers: headers }
    ) );

  }
}
