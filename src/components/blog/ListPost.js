import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import PostListItem from "./PostListItem";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";


function ListPosts() {
  const user = useSelector((store) => store.auth.user);
  const [allPosts, setAllPosts] = useState([]); // Store all the fetched posts from the API
  const [filteredPosts, setFilteredPosts] = useState([]); // Store the filtered posts based on search term
  const [SearchTerm, setSearchTerm] = useState("");


  const handleSearchInputChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    axios.get(`https://medicalstore.mashupstack.com/api/medicine/search?keyword=${SearchTerm}`, {
            params: { keyword: SearchTerm },
            headers: { Authorization: "Bearer " + user.token },
          })
          .catch((error) => {
            console.error('Error fetching search results:', error);
          });
    event.preventDefault();
    if (SearchTerm.trim() === "") {
      // If the search input is empty, reset the filteredPosts state.
      setFilteredPosts(allPosts);
    } else {
      // Otherwise, filter the posts based on the search term.
      var filteredItems = allPosts.filter((item) =>
        item.name.toLowerCase().includes(SearchTerm.toLowerCase())
      );
      setFilteredPosts(filteredItems);
      console.log(filteredItems);
    }
  };

  function fetchPosts() {
    if(user){
      axios.get('https://medicalstore.mashupstack.com/api/medicine',
        {
          headers: { Authorization: "Bearer " + user.token },
        })
        .then((response) => {
          setAllPosts(response.data);
          setFilteredPosts(response.data); // Initialize filteredPosts with all the fetched posts
        });
  }
}

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <form>
              <label>Search Blog: </label>
              <input
                type="text"
                value={SearchTerm}
                onChange={handleSearchInputChange}
              />{" "}
              &nbsp;
              <button
                className="btn btn-small btn-success"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
              &nbsp;
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">Blog</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <Link to="/blog/medicine/create" className="btn btn-info mb-2">
              Create Post
            </Link>
            {filteredPosts.length === 0 ? (
              <p>No matching posts found.</p>
            ) : (
              filteredPosts.map((post) => (
                <PostListItem key={post.id} post={post} refresh={fetchPosts} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ListPosts);
