import React, { Fragment } from "react";
import FileUpload from "./components/FileUpload";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/uploader" element={<FileUpload />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </Fragment>
    </Router>
  );
};

export default App;
