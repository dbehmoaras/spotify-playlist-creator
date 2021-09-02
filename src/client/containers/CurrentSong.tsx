import React, { useState, useEffect, useContext } from "react";
import { render } from "react-dom";
import Cookies from "js-cookie";
import FunctionButton from "./../components/FunctionButton";
import serverRoutes from "./../constants/serverRoutes";
import Context from "./../context/Context";
import { Song } from "./../../interfaces/spotifyInterfaces";

declare function require(name: string);
const axios = require("axios");

const cloudIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={640 / 4}
    height={640 / 4}
    fill="currentColor"
    className="bi bi-cloud-haze2-fill"
    viewBox="0 0 16 16"
  >
    <path d="M8.5 2a5.001 5.001 0 0 1 4.905 4.027A3 3 0 0 1 13 12H3.5A3.5 3.5 0 0 1 .035 9H5.5a.5.5 0 0 0 0-1H.035a3.5 3.5 0 0 1 3.871-2.977A5.001 5.001 0 0 1 8.5 2zm-6 8a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zM0 13.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
  </svg>
);

function CurrentSong(props) {
  const { globalUserId, activePlaylist, setActivePlaylist } =
    useContext(Context);
  const addTrackQString = serverRoutes.SRV_ADD_TRACK + "?user=" + globalUserId;
  const [currentSong, setCurrentSong] = useState({
    Title: "",
    Artist: "",
    Album: "",
    ID: "",
    URI: "",
    ImageObject: {
      height: 0,
      width: 0,
      url: "",
    },
  });

  useEffect(() => {
    getPlayingSong().then((song) => {
      setCurrentSong(song);
    });
  }, []);

  const getPlayingSong = async () => {
    const userId = Cookies.get("userId");
    const { SRV_MAIN, SRV_PLAYING_SONG } = serverRoutes;
    const queryString = SRV_PLAYING_SONG + "?user=" + userId;

    return await axios
      .get(queryString)
      .then((res) => {
        const data = res.data;
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  };

  const addSong = async (addBody) => {
    return await axios.post(addTrackQString, addBody).then(() => {
      const triggerActivePlaylist = Object.assign("", activePlaylist);
      setActivePlaylist(triggerActivePlaylist);
    });
  };

  const renderSongDetails = () => {
    if (currentSong) {
      return (
        <div id="current-song">
          <div id="album-image">
            <img
              src={currentSong.ImageObject.url}
              height={currentSong.ImageObject.height / 3}
              width={currentSong.ImageObject.width / 3}
            ></img>
          </div>
          <div
            id="song-details"
            style={{ fontWeight: "bold", textDecoration: "underline" }}
          >
            {currentSong.Title}
          </div>
          <div
            id="song-details"
            style={{ fontWeight: "bold", fontStyle: "italic" }}
          >
            {currentSong.Artist}
          </div>
          <div id="song-details" style={{ fontStyle: "italic" }}>
            {currentSong.Album}
          </div>
        </div>
      );
    } else {
      return <div id="album-image">{cloudIcon}</div>;
    }
  };

  return (
    <div id="current-song-container">
      <h2 id="song-header">Current Song:</h2>
      <div id="current-song-functions">
        <FunctionButton
          name={"Add Song"}
          data={{
            playlistId: activePlaylist.id,
            playlistName: activePlaylist.name,
            uris: [currentSong.URI],
          }}
          func={addSong}
        />
        <FunctionButton
          id="function-button"
          name={"Refresh"}
          func={() =>
            getPlayingSong().then((song) => {
              return setCurrentSong(song);
            })
          }
        />
      </div>
      {renderSongDetails()}
    </div>
  );
}

export default CurrentSong;
