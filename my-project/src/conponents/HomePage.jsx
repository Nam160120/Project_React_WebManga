import React, { useState } from "react";
import Home from "./page/Home";
import { useGlobalContext } from "../context/Global";
import UpComingManga from "./page/UpComingManga";
import AiringManga from "./page/AiringManga";
import HorrorManga from "./page/HorrorManga";
import DramaManga from "./page/DramaManga";
import RomanceManga from "./page/RomanceManga";
import { NavLink } from "react-router-dom";

function HomePage() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  //log out
  const handleButton = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };

  //lấy hàm và biến từ contex Global
  const {
    handleSubmit,
    search,
    handleChange,
    getAiringManga,
    getUpComingManga,
    getDramaManga,
    getHorrorManga,
    getRomanceManga,
  } = useGlobalContext();

  const [rendered, setRendered] = useState("home");

  // render catalogy
  const switchComp = () => {
    switch (rendered) {
      case "home":
        return <Home rendered={rendered} />;
      case "upcoming":
        return <UpComingManga rendered={rendered} />;
      case "airing":
        return <AiringManga rendered={rendered} />;
      case "horror":
        return <HorrorManga rendered={rendered} />;
      case "drama":
        return <DramaManga rendered={rendered} />;
      case "romance":
        return <RomanceManga rendered={rendered} />;
      default:
        return <Home rendered={rendered} />;
    }
  };
  return (
    <div>
      <header>
        {/* search */}
        <div className="test">
          <form action="" className="search-form">
            <div className="input-control">
              <input
                type="text"
                placeholder="Search manga ..."
                value={search}
                onChange={handleChange}
              />
              <button type="submit" onClick={handleSubmit}>
                Search
              </button>
            </div>
            <div className="search-results"></div>
          </form>
          <div className="loginSignup">
            {user ? (
              user.permission === "admin" ? (
                // admin
                <>
                  <div className="admin">
                    <NavLink to={"/admin"}>Admin page</NavLink>
                    <br />
                    <NavLink to={"/"} onClick={handleButton}>
                      Log out
                    </NavLink>
                  </div>
                </>
              ) : (
                // user
                <>
                  <div className="user">
                    Welcome, {user.email}
                    <br />
                    <NavLink to={"/"} onClick={handleButton}>
                      Log out
                    </NavLink>
                  </div>
                </>
              )
            ) : (
              // chưa login
              <div className="left-header">
                <NavLink to={"/login"}>Log in</NavLink>

                <NavLink to={"/register"}>Register</NavLink>
              </div>
            )}
          </div>
        </div>
        {/* thể loại */}
        <div className="search-container">
          <div className="filter-btn popular-filter">
            <button
              onClick={() => {
                setRendered("home");
              }}
            >
              Home
            </button>
          </div>
          <div className="filter-btn airing-filter">
            <button
              onClick={() => {
                setRendered("airing");
                getAiringManga();
              }}
            >
              Action
            </button>
          </div>
          <div className="filter-btn upcoming-filter">
            <button
              onClick={() => {
                setRendered("drama");
                getDramaManga();
              }}
            >
              Drama
            </button>
          </div>
          <div className="filter-btn upcoming-filter">
            <button
              onClick={() => {
                setRendered("horror");
                getHorrorManga();
              }}
            >
              Horror
            </button>
          </div>
          <div className="filter-btn upcoming-filter">
            <button
              onClick={() => {
                setRendered("romance");
                getRomanceManga();
              }}
            >
              Romance
            </button>
          </div>
          <div className="filter-btn upcoming-filter">
            <button
              onClick={() => {
                setRendered("upcoming");
                getUpComingManga();
              }}
            >
              Comedy
            </button>
          </div>
        </div>
        {/* tiêu đề */}
        <div className="logo">
          <h2>
            {rendered === "home"
              ? "Home page"
              : rendered === "airing"
              ? "Action Manga"
              : rendered === "drama"
              ? "Drama Manga"
              : rendered === "horror"
              ? "Horror Manga"
              : rendered === "romance"
              ? "Romance Manga"
              : "Comedy Manga"}
          </h2>
        </div>
      </header>
      {switchComp()}
      <div className="footer">
        Footer Manga
      </div>
    </div>
  );
}

export default HomePage;
