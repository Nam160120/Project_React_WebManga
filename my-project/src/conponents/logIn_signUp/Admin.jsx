import { useState, useEffect } from "react";
import "./Admin.css";
import { Link } from "react-router-dom";

function Admin() {
  const [users, setUsers] = useState([]);

  //cập nhật state
  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  //xóa user
  const handleDeleteUser = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
      })
        .then(() => {
            // xóa cmt của user bị xóa
          fetch("http://localhost:8000/comments")
            .then((res) => res.json())
            .then((data) => {
              const commentsToDelete = data.filter(
                (comment) =>
                  comment.user === users.find((user) => user.id === id).email
              );
              commentsToDelete.forEach((comment) => {
                fetch(`http://localhost:8000/comments/${comment.id}`, {
                  method: "DELETE",
                });
              });
            })
            .catch((err) => console.log(err));

          // xóa user trong list
          const updatedUsers = users.filter((user) => user.id !== id);
          setUsers(updatedUsers);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="admin">
      <div className="back">
        <Link to="/">Back to home</Link>
      </div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Permission</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.permission}</td>

              <td>
                {user.email !== "admin@gmail.com" && (
                  <button onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
