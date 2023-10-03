import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";


const Login = () => {
    const [registerError, setRegisterError] = useState('')
    const [sucess, setSucess] = useState('')
    const emailRef = useRef(null);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // Login user
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                console.log(userCredential.user);
                if(email.user.emailVerified){
                    setSucess('User LogIn Successfully')
                }  else{
                    setRegisterError('Please Verify Your Email Address!')
                }

            })
            .catch(error => {
                console.error(error)
                setRegisterError('Provid a valide user and password')

            });
        // reset error
        setRegisterError('')
        setSucess('')

    }

    // forget email pass 
    const handleResetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log('Please Provid an Email', emailRef.current.value);
            return;
        }
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            console.log('Please provid a valid email');
            return;
        }
        // Send validation email 
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please Check your Email');
            })
            .catch(error => {
                console.log(error.message);
            })

    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    ref={emailRef}
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a onClick={handleResetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <p>New to this websit? Please <Link to="/registerForm">Register</Link></p>
                            {
                                registerError && <p className="text-red-600 text-center">{registerError}</p>
                            }
                            {
                                sucess && <p className="text-green-500 text-center">{sucess}</p>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;