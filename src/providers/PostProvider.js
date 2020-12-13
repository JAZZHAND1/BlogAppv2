import React, { useState } from "react";

const PostContext = React.createContext();

const postprovider = (props) => {
    const[clickedpost,setclickedpost] = useState({});

    return (
        <PostContext.Provider
          value={{
            clickedpost: clickedpost,
            setclickedpost: setclickedpost,
          }}
        >
          {props.children}
        </PostContext.Provider>
      );
    };
export {postprovider,PostContext};