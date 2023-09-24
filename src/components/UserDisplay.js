import React, { useState, useEffect } from "react";

function UserDisplay() {
  const [user, setUser] = useState(null);
  const [displayInfo, setDisplayInfo] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      setUser(data.results[0]);
      setDisplayInfo(null);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleButtonClick = (attr) => {
    setDisplayInfo(attr);
  };

  return (
    <div>
      {user && (
        <div>
          <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
          <h2>{`${user.name.first} ${user.name.last}`}</h2>
          <button data-attr="age" onClick={() => handleButtonClick("age")}>
            Age
          </button>
          <button data-attr="email" onClick={() => handleButtonClick("email")}>
            Email
          </button>
          <button data-attr="phone" onClick={() => handleButtonClick("phone")}>
            Phone
          </button>
          <button id="getUser" onClick={fetchUser}>
            Get New User
          </button>
          {displayInfo && (
            <div>
              <h3>Additional Info</h3>
              {displayInfo === "age" && <p>Age: {user.dob.age}</p>}
              {displayInfo === "email" && <p>Email: {user.email}</p>}
              {displayInfo === "phone" && <p>Phone: {user.phone}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDisplay;
