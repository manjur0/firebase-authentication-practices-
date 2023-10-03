import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";

const Register = () => {
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('');

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        if (password.length < 6) {
            setErrorMsg('Password at lest 6 carecter requared');
            return;
        }
        setErrorMsg('')
        setSuccessMsg('')
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user)
                setSuccessMsg('SuccessFully registered')
            })
            .catch(error => {
                console.error(error.message);
                setErrorMsg(error.message);
            })
    }

    return (
        <div className="container ">
            <div className="mx-auto  w-96 ">
                <h3 className="text-2xl">Registration Now </h3>
                <form onSubmit={handleRegister} >
                    {/* <input className="py-2 my-4 w-3/4 px-4 rounded-md" type="name" name="name" placeholder="Your Name" /> <br /> */}
                    <input className="py-2 my-4 w-3/4 px-4 rounded-md" type="email" name="email" placeholder="Your Email" required /><br />
                    <input className="py-2 my-4 w-3/4 px-4 rounded-md" type="password" name="password" placeholder="Your Password" required /><br />
                    <input className="py-2 my-4 w-3/4 px-4 rounded-md btn btn-secondary" type="submit" value="Register" />
                </form>
                {
                    errorMsg && <p>{errorMsg}</p>
                }
                {
                    successMsg && <p>{successMsg}</p>
                }
            </div>
        </div>
    )
};

export default Register;