import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios";

function MangaItem() {
  // lấy id từ URL
  const { id } = useParams();
  //state
  const [manga, setManga] = useState({});
  const [showMore, setShowMore] = useState(false);

  // destructure manga
  const {
    title,
    authors,
    genres,
    images,
    rank,
    score,
    scored_by,
    popularity,
    status,
    synopsis,
  } = manga;

  // comment
  const [commentData, setCommentData] = useState({
    commentText: "",
  });
  const [comments, setComments] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //lấy comment
  const getComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/manga/${id}/comments`
      );
      setComments(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // check user
  useEffect(() => {
    getComments();
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setIsLoggedIn(true);
    }
  }, [id]);

  // nhập cmt
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCommentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  // add cmt
  const handleAddComment = async () => {
    try {
      if (!currentUser) {
        alert("You need to log in to do this !");
        return;
      }

      const { commentText } = commentData;
      const response = await axios.post(
        `http://localhost:8000/manga/${id}/comments`,
        {
          user: currentUser.email,
          comment: commentText,
        }
      );
      const newComment = response.data;
      console.log(response.data.id);
      setComments([...comments, newComment]);

      setCommentData({
        commentText: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // manga theo id
  const getManga = async (manga) => {
    const response = await fetch(`https://api.jikan.moe/v4/manga/${manga}`);
    const data = await response.json();
    setManga(data.data);
  };

  useEffect(() => {
    getManga(id);
  }, []);

  // Sửa cmt
  const handleEditComment = async (comment) => {
    let newCommentText = prompt("Change your comment : ");
    try {
      await axios
        .put(`http://localhost:8000/comments/${comment.id}`, {
          comment: newCommentText,
          user: comment.user,
          mangaId: comment.mangaId,
        })
        .then((res) => console.log(res.request.status))
        .catch((err) => console.log(err));
      getComments();
    } catch (error) {
      console.log(error);
    }
  };

  // Xóa cmt
  const handleDeleteComment = async (id) => {
    console.log("id xóa", id);
    try {
      await axios.delete(`http://localhost:8000/comments/${id}`);
      getComments();
    } catch (error) {
      console.log(error);
    }
  };

  // Kiểm tra email đăng nhập có đúng không
  const isCurrentUser = (email) => {
    return currentUser && currentUser.email === email;
  };

  return (
    <div>
      <div className="back">
        <Link to="/">Back to home</Link>
      </div>
      <h1>{title}</h1>
      <div className="details">
        <div className="detail">
          <div className="image">
            <img src={images?.jpg.large_image_url} alt="" />
            <div className="read">
              <Link to="/manga/:id/items">Read Manga</Link>
            </div>
          </div>
          <div className="manga-details">
            {authors && authors.length > 0 && (
              <p>
                <span className="title-manga">Authors :</span>{" "}
                <span>{authors[0]?.name}</span>
              </p>
            )}
            <p>
              <span className="title-manga">Category : </span>{" "}
              <span>{genres?.map((genre) => genre.name).join(", ")}</span>
            </p>
            <p>
              <span className="title-manga">Rank : </span> <span>{rank}</span>
            </p>
            <p>
              <span className="title-manga">Score : </span> <span>{score}</span>
            </p>
            <p>
              <span className="title-manga">View : </span>{" "}
              <span>{scored_by}</span>
            </p>
            <p>
              <span className="title-manga">Popularity : </span>{" "}
              <span>{popularity}</span>
            </p>
            <p>
              <span className="title-manga">Status : </span>{" "}
              <span>{status}</span>
            </p>
            <p className="description">
              <span className="title-manga">Synopsis : </span>{" "}
              <span>
                {showMore ? synopsis : synopsis?.substring(0, 150) + "... "}
              </span>
              <button
                onClick={() => {
                  setShowMore(!showMore);
                }}
              >
                {showMore ? "Show Less" : "Read More"}
              </button>
            </p>
          </div>
        </div>
      </div>
      <div className="comments-list">
        <div className="form-group">
          <label htmlFor="commentText">
            <h3>Comments:</h3>
          </label>
          <input
            value={commentData.commentText}
            onChange={handleInputChange}
            name="commentText"
            className="form-control"
          ></input>
        </div>
        <button
          type="button"
          onClick={handleAddComment}
          className="btn btn-primary"
        >
          Add comment
        </button>
        {comments.map((comment, index) => (
          <div key={index} className="commentItem">
            <p className="userComment">{comment.user}</p>
            <p>{comment.comment}</p>
            {isCurrentUser(comment.user) && (
              <div>
                <button
                  onClick={() => {
                    handleEditComment(comment);
                  }}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <span> </span>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MangaItem;
