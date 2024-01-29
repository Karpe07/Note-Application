import React, { useEffect }  from 'react'
import { useNavigate } from 'react-router-dom'

function About() {
  const history = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){

    }
    else{
      history("/Login")
    }
  }, [])
  
 
  return (
    <div>
      I'm About Page!
    </div>
  )
}

export default About
