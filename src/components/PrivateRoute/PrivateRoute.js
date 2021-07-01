import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
    const [login, setLogin] = useContext(UserContext)
    return (
        <Route
        {...rest}
        render={({ location }) =>
          login.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;