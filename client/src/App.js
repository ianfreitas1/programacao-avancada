import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CourseItemPage from './pages/CourseItemPage';
import CourseListPage from './pages/CourseListPage';
import TaughtCoursesPage from './pages/TaughtCoursesPage';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={RegisterPage} />
          <PrivateRoute path="/dashboard" component={DashboardPage} />
          <PrivateRoute path="/my-courses" component={CourseListPage} />
          <PrivateRoute
            path="/my-taught-courses"
            component={TaughtCoursesPage}
          />
          <PrivateRoute path="/course/:id" component={CourseItemPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
