import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Login(props) {
    const [credential, setCredential] = useState({email : "" , password : ""})
    const history = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email : credential.email, password : credential.password})
          });
          const json = await response.json();
          console.log(json)
          if(json.success ){
            //Save the auth token and redirect
            localStorage.setItem("token" , json.authtoken)
            props.showAlert("Login Successful" ,"success")
            history("/")
          }
          else{
            props.showAlert("Invalid Credentials" ,"denger")
          }
    }
    const onchange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
      }
    return (
        <section className="vh-90">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100" style={{marginTop: "9vh"}}>
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample image"/>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleSubmit}>
                                <div className=" justify-content-center divider d-flex align-items-center my-4">
                                    <h3 className="text-center fw-bold mx-3 mb-0 ">Login</h3>
                                </div>
                                {/* <!-- Email input --> */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" for="form3Example3">Email address</label>
                                    <input type="email" id="email" name='email' className="form-control form-control-md mx-2"
                                        placeholder="Enter a valid email address" value={credential.email} onChange={onchange} />
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="form-outline mb-3">
                                    <label className="form-label" for="form3Example4">Password</label>
                                    <input type="password" id="password" name='password' className="form-control form-control-md mx-2"
                                        placeholder="Enter password" value={credential.password} onChange={onchange} />
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg"
                                        style={{paddingLeft : "2.5rem", paddingRight: "2.5rem"}}>Login</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/SignUp"
                                        className="link-danger">Register</a></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
    )
}

export default Login
