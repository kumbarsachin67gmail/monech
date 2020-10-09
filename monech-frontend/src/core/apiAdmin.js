import { API } from "../apiurl";

export const createCategory = ( category) => {
  return fetch(`${API}/category/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCategories=()=>{
    return fetch(`${API}/categories`,{
      method:"GET"
    })
    .then(response=>{
      return response.json();
    })
    .catch(err=>console.log(err));
  } 