import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";


const RegisterForm = () => {
    const [registerError, setRegisterError] = useState('')
    const [sucess, setSucess] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const handleRegister = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checked = e.target.term.checked;
        console.log(email, password, checked);
        // password at least 6 carecter
        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your Password Should be at least one upper case charecter !')
            return;
        }
        else if (!checked) {
            registerError('Please accept our terms and conditions');
            return;
        }

        // reset error
        setRegisterError('')
        setSucess('')

        // creat user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSucess('User Create Successfully');
                // Email verification 
                sendEmailVerification(result.user)
                    .then(() => {
                        alert('Please Check Your Email And Verify Your Account');
                    })

            })
            .catch(error => {
                console.log(error.message);
                setRegisterError(error.message)
            })
    }
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    {/* <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Registration now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div> */}
                    <div className="card  w-full  shadow-2xl bg-base-100">
                        <div className="card-body ">

                            <form onSubmit={handleRegister}> <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="Email" required name="email" className="input input-bordered" />
                            </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>

                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password"
                                            required name="password"
                                            className="input input-bordered" />
                                        <span className="cursor-pointer absolute top-4 right-2"
                                            onClick={() => setShowPassword(!showPassword)}>
                                            {
                                                showPassword ? <AiFillEye></AiFillEye> : <AiFillEyeInvisible></AiFillEyeInvisible>
                                            }
                                        </span>

                                        <div className="form-control">
                                            <label className="cursor-pointer  my-5 items-center inline-block">
                                                <input type="checkbox" className="checkbox checkbox-success" name="term" id="term" required />
                                                <label htmlFor="term" className="mx-5"><a href="#">Accept All</a></label>
                                            </label>
                                        </div>

                                    </div>


                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" name="submit" className="btn btn-primary">Registration</button>
                                </div>
                            </form>
                            {
                                registerError && <p className="text-red-600 text-center">{registerError}</p>
                            }
                            {
                                sucess && <p className="text-green-500 text-center">{sucess}</p>
                            }
                            <p>Allready have an account? Please <Link to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;