import React from "react"
import { Route,BrowserRouter,Link,Switch } from "react-router-dom"
import Home from "./pages/home"
import My from "./pages/my"
import Test from "./pages/test"
class AppRouter extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <ul>
                    <li><Link to="/home">home</Link></li>
                    <li><Link to="/test">test</Link></li>
                    <li><Link to="/my">my</Link></li>
                </ul>
                <div>
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route exact path="/test" component={Test}/>
                        <Route exact path="/my" component={My}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
export default AppRouter;