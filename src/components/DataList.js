import React, { useState, useEffect } from "react";
import axios from "axios";
function DataList() {
  const [post, setPost] = useState();
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setPost(response.data);
    });
  }, []);
  const filteredData = filter
    ? post.filter(
        ({ capital }) =>
          capital &&
          capital.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      )
    : post;

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        className="mb-3 bg-light border border-primary rounded col-6"
      />
      {!post ? (
        "No data found"
      ) : (
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Capital</th>
              <th>Region</th>
              <th>Flag</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((post, index) => {
              return (
                <tr key={index}>
                  <td>{post.name}</td>
                  <td>{post.capital}</td>
                  <td>{post.region}</td>
                  <td>
                    <img
                      src={post.flag}
                      style={{ heigth: "200px", width: "200px" }}
                      alt=""
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DataList;
