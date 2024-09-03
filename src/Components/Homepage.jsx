import React, { useEffect } from 'react'
import Adminpage from '../Pages/Adminpage';
import Userspage from '../Pages/Userspage';
import { useNavigate } from 'react-router';

function Homepage() {

  const usenameOne = JSON.parse(sessionStorage.getItem("useDetails"));
  console.log(usenameOne);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token")

    if (token == null) {
      return navigate("/login", { replace: true })
    }

  }, [])
  return (
    <div>
      {
        usenameOne?.emailId == "admin@gmail.com" ? <Adminpage /> : <Userspage />
      }
    </div>
  )
}

export default Homepage