// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import ForgetPasswordForm from './ForgetPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/forget-password" component={ForgetPasswordForm} />
          <Route path="/reset-password/:token" component={ResetPasswordForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
