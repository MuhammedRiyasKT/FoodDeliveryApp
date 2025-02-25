// import { useState } from "react";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import { ToastContainer, toast } from 'react-toastify';
// import { userLoginApi, userRegisterApi } from "../services/allApi";
// import { useNavigate } from "react-router-dom";

// export default function AuthPage() {
//   const navigate = useNavigate()
//   const [isLogin, setIsLogin] = useState(true);
//   const [userDetails, setUserDetails] = useState({username:"", email:"", password:""})
//   console.log(userDetails)

//   const handleRegister = async (e)=>{
//     e.preventDefault()
//      if(userDetails.username && userDetails.email && userDetails.password){
//       try {
//         const result = await userRegisterApi(userDetails)
//         if(result.status == 200){
//           toast.success(`welcome ${result.data.username} please login to explore oru website`)
//           setUserDetails({username:"", email:"", password:""})
//           navigate('/login')

//         }else{
//           if(result.status ==406){
//             toast.warning(`${result.response.data}`)
//             setUserDetails({username:"", email:"", password:""})
//           }
//         }
//         console.log(result)
//         console.log(userDetails)
        
//       } catch (error) {
//         console.log(error)
//       }
//      }else{
//       toast.error("enter the filed compleately")
//      }
//   }

//   const handleLogin = async (e) => {
//     e.preventDefault();
  
//     if (userDetails.email && userDetails.password) {
//       try {
//         const result = await userLoginApi(userDetails);
        
//         if (result.status === 200) {
//           sessionStorage.setItem("user", JSON.stringify(result.data.user));
//           sessionStorage.setItem("token", result.data.token);
  
//           if (result.data.user.roll === "User") {
//             navigate("/");
//           } else {
//             navigate("/admin-dashboard"); // Replace with actual admin dashboard route
//           }
//         } else {
//           toast.error("Invalid username or password");
//         }
//       } catch (error) {
//         toast.error("Something went wrong! Please try again.");
//         console.error("Login error:", error);
//       }
//     } else {
//       toast.error("Please enter email and password");
//     }
//   };
  


//   return (
//     <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <Row className="w-100">
//         <Col md={{ span: 6, offset: 3 }}>
//           <Card className="p-4 shadow-lg border-0 rounded-4">
//             <h2 className="text-center mb-4 text-primary fw-bold">
//               {isLogin ? "Login" : "Sign Up"}
//             </h2>
//             <Form>
//               {!isLogin && (
//                 <Form.Group className="mb-3" controlId="formBasicName">
//                   <Form.Label>Full Name</Form.Label>
//                   <Form.Control onChange={(e)=>setUserDetails({...userDetails, username:e.target.value})} value={userDetails.username} type="text" placeholder="Enter full name" />
//                 </Form.Group>
//               )}
              
//               <Form.Group className="mb-3" controlId="formBasicEmail">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control onChange={(e)=>setUserDetails({...userDetails, email:e.target.value})} value={userDetails.email} type="email" placeholder="Enter email" />
//               </Form.Group>
              
//               <Form.Group className="mb-3" controlId="formBasicPassword">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control onChange={(e)=>setUserDetails({...userDetails, password:e.target.value})} value={userDetails.password} type="password" placeholder="Password" />
//               </Form.Group>
              
//               <Button onClick={isLogin ? handleLogin : handleRegister} variant="primary" type="submit" className="w-100">
//                 {isLogin ? "Login" : "Sign Up"}
//               </Button>
//             </Form>
            
//             <p className="text-center mt-3">
//               {isLogin ? "Don't have an account?" : "Already have an account?"} 
//               <span
//                 className="text-primary fw-bold cursor-pointer"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => setIsLogin(!isLogin)}
//               >
//                 {isLogin ? " Sign up" : " Login"}
//               </span>
//             </p>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

import React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from "react";
import { userLoginApi, userRegisterApi } from "../services/allApi";
import { useNavigate } from "react-router-dom";
import loginPng from '../assets/login.png'

function Auth({ insideRegister }) {
    const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const [userDetails, setUserDetails] = useState({username:"", email:"", password:""})
  console.log(userDetails)

  const handleRegister = async (e)=>{
    e.preventDefault()
     if(userDetails.username && userDetails.email && userDetails.password){
      try {
        const result = await userRegisterApi(userDetails)
        if(result.status == 200){
          toast.success(`welcome ${result.data.username} please login to explore oru website`)
          setUserDetails({username:"", email:"", password:""})
          navigate('/login')

        }else{
          if(result.status ==406){
            toast.warning(`${result.response.data}`)
            setUserDetails({username:"", email:"", password:""})
          }
        }
        console.log(result)
        console.log(userDetails)
        
      } catch (error) {
        console.log(error)
      }
     }else{
      toast.error("enter the filed compleately")
     }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (userDetails.email && userDetails.password) {
      try {
        const result = await userLoginApi(userDetails);
        
        if (result.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
  
          if (result.data.user.roll === "User") {
            navigate("/");
          } else {
            navigate("/admin-dashboard"); // Replace with actual admin dashboard route
          }
        } else {
          toast.error("Invalid username or password");
        }
      } catch (error) {
        toast.error("Something went wrong! Please try again.");
        console.error("Login error:", error);
      }
    } else {
      toast.error("Please enter email and password");
    }
  };
  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="card w-75 shadow-lg border-0 rounded-3" style={{backgroundColor:"lightgreen"}}>
          <div className="row g-0">
            <div className="col-lg-6 d-flex align-items-center justify-content-center">
              <img
                className="img-fluid rounded-4 w-75"
                src={loginPng}
                alt="Login Illustration"
              />
            </div>
            <div className="col-lg-6 p-5">
              <h4 className="text-center mb-3 text-black">
                <i class="fa-solid fa-hotel"></i> Silver Star
              </h4>
              <h5 className="text-center mb-4 text-secondary">
                Sign {insideRegister ? 'Up' : 'In'} to your Account
              </h5>

              {/* Form */}
              <form onSubmit={insideRegister ? handleRegister : undefined}>
                {insideRegister && (
                  <FloatingLabel controlId="floatingUsername" label="User Name" className="mb-3">
                    <Form.Control
                      onChange={(e)=>setUserDetails({...userDetails, username:e.target.value})} value={userDetails.username}
                      type="text"
                      placeholder="Enter your name"
                    />
                  </FloatingLabel>
                )}

                <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
                  <Form.Control
                    onChange={(e)=>setUserDetails({...userDetails, email:e.target.value})} value={userDetails.email}
                    type="email"
                    placeholder="Enter your email"
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    onChange={(e)=>setUserDetails({...userDetails, password:e.target.value})} value={userDetails.password}
                    type="password"
                    placeholder="Enter your password"
                  />
                </FloatingLabel>
              </form>

              {insideRegister ? (
                <div className="mt-4">
                  <button onClick={handleRegister} className="btn btn-info w-100">
                    Sign Up
                  </button>
                  <p className="text-center mt-3">
                    Already have an account?{' '}
                    <Link className="text-info" to={'/login'}>
                      Login
                    </Link>
                  </p>
                </div>
              ) : (
                <div className="mt-4">
                  <button onClick={handleLogin} className="btn btn-info w-100">
                    Sign In
                  </button>
                  <p className="text-center mt-3">
                    Don't have an account yet?{' '}
                    <Link className="text-info" to={'/register'}>
                      Register
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;

