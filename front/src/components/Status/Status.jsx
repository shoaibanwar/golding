import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Status.module.css";

const Status = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatus = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("You are not authenticated.");
      } else {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}user/status`, {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || "Failed to fetch user data");
            }
            const data = await response.json();
            setUsers(data);
          } catch (err) {
            setError(err.message);
          }
      }
      
    };
    fetchStatus();
  }, []);


  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Users List</h2>
      {users ? <pre className={styles.usersList}>{JSON.stringify(users, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default Status;