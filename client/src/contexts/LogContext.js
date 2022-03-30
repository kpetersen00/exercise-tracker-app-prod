import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
const LogContext = React.createContext();

export function useLog() {
  return useContext(LogContext);
}

export default function LogProvider({ children }) {
  const [log, setLog] = useState([]);
  const { currentUser } = useAuth();

  function getExercises() {
    axios.get(`/api/${currentUser.uid}`).then((response) => {
      const data = response.data;
      console.log(data);
      setLog(data);
    });
  }

  function logExercise(title, duration, date) {
    const payload = {
      username: currentUser.email,
      uid: currentUser.uid,
      description: title,
      duration: duration,
      date: date,
    };
    axios({
      url: `/api/exercises`,
      method: 'POST',
      data: payload,
    }).then(() => {
      getExercises();
    });
  }

  const value = {
    log,
    getExercises,
    logExercise,
  };

  return <LogContext.Provider value={value}>{children}</LogContext.Provider>;
}
