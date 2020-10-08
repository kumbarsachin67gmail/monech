import React, { useState,useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";
import { getCategories } from "./apiAdmin";
import moment from 'moment';

const AskQuestion = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);

  const { categories } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) { 
        console.log(data.error);
      } else {
         setData(data);
        console.log(data)
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    //make request to create category
    createCategory({ name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">type here</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Add Question</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>;
    }
  };
  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be uniq</h3>;
    }
  };


  return (
    <Layout
      title="Add a new Question"
      description={`G'day ${user.name} ready to add new Question`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryFom()}
          {/* {showQuestions()} */}
         {/* { JSON.stringify(categories)} */}
         {data.map((item,index)=>(
             <h4><li key={index} >{item.name} {" "}<span style={{color:"#827db1 "} } >(Added on {moment(item.createdAt).fromNow()})</span></li></h4>
         ))}
        </div>
      </div>
    </Layout>
  );
};
export default AskQuestion;
