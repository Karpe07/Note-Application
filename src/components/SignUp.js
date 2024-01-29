import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function SignUp(props) {
    const [credential, setCredential] = useState({name:"", email:"",password:""})
    const history = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {name, email, password} = credential

        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password})
          });
          const json = await response.json();
          console.log(json)
            //Save the auth token and redirect
            localStorage.setItem("token" , json.authtoken)
            props.showAlert("Account Successfully created!!" ,"success")
            history("/")

    }
    const onchange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
      }
    return (

        <div>
            <section className="vh-90">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100" style={{marginTop: "9vh"}} >
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleSubmit}>
                                <div className=" justify-content-center divider d-flex align-items-center my-4">
                                    <h3 className="text-center fw-bold mx-3 mb-0 ">Sign In</h3>
                                </div>

                                {/* Name  */}
                                
                                    <div className="form-outline mb-4">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form3Example1">Enter Full Name</label>
                                            <input type="text" id="name" name='name' className="form-control" value={credential.name}  onChange={onchange}  placeholder="Enter First Name" required />
                                        </div>
                                    </div>

                                {/* <!-- Email input --> */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3">Email address <span className="badge badge-pill badge-light">safkab</span></label>
                                    <input type="email" id="email" name='email' className="form-control form-control-md" value={credential.email} onChange={onchange}
                                        placeholder="Enter a valid email address" required />
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form3Example1">Password</label>
                                            <input type="password" id="password" name='password' className="form-control" value={credential.password}  onChange={onchange}  placeholder="Enter Password at least of 5 charactor" minLength={5} required />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4"> 
                                        <div className="form-outline">
                                            <label className="form-label" htmlFor="form3Example2">Confirm Password</label>
                                            <input type="password" id="cpassword" name='cpassword' className="form-control" value={credential.cpassword} onChange={onchange}  placeholder="Enter Confirm Password at least of 5 charactor" minLength={5} required />
                                        </div>
                                    </div>
                                </div>


                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-md"
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Register</button>
                                        <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="/Login"
                                        className="link-danger">Login</a></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignUp
