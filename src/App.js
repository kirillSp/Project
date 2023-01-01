import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import { initinalApp } from "./Redux/appReducer";

import HeaderContainer from "./Components/header/headerContainer";
import Navigation from "./Components/nav/nav";
import ProfileContainer from "./Components/main/ProfileContainer";
import DialogsContainer from "./Components/nav/Dialogs/DialogsContainer";
import News from "./Components/nav/News/News"
import Music from "./Components/nav/Music/music"
import Settings from "./Components/nav/Settings/Settings";
import FindUsersContainer from "./Components/nav/FindUsers/FindUsersContainer";
import Login from "./Components/main/Login/login";
import Preloader from "./Components/GlobalComponent/Preloader/Preloader";

class App extends React.Component {
    componentDidMount() {
        this.props.initinalApp();
    }

    render() {
        if (!this.props.initialized) return <Preloader />

        return <div>
            <div className="app-wrapper">
                <HeaderContainer />
                <Navigation />

                <div className="message-wrapper">
                    <Routes>
                        <Route path="/profile/" element={<ProfileContainer />}></Route>
                        <Route path="/profile/:userId" element={<ProfileContainer />}></Route>
                        <Route path="/dialogs/*" element={<DialogsContainer />}></Route>
                        <Route path="/music" element={<Music />}></Route>
                        <Route path="/news" element={<News />}></Route>
                        <Route path="/settings" element={<Settings />}></Route>
                        <Route path="/findUsers" element={<FindUsersContainer />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                    </Routes>
                </div>

            </div>
        </div>

    }
}

let mapStateToProps = (state) => ({ initialized: state.appReducer.initialized })
export default connect(mapStateToProps, { initinalApp })(App);