import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={RegisterPage} />
          <Route path="/dashboard" component={DashboardPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
