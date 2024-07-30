import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3qth19xwe_C4lIND1PtEvcg2zZSUCf5g",
  authDomain: "shenovate-ae777.firebaseapp.com",
  projectId: "shenovate-ae777",
  storageBucket: "shenovate-ae777.appspot.com",
  messagingSenderId: "604954931420",
  appId: "1:604954931420:web:fa89817064d653576a8419",
  measurementId: "G-V42LL04W5Z",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

// Get elements
const signupName = document.querySelector("#name");
const signupEmail = document.querySelector("#email");
const signupPassword = document.querySelector("#password");
const signupButton = document.querySelector("#signup-button");
const signinEmail = document.querySelector("#login_email");
const signinPassword = document.querySelector("#login_password");
const signinButton = document.querySelector("#signin-button");
const signoutButton = document.querySelector("#sign_out");
const signupText = document.querySelector("#signup_text");
const loginText = document.querySelector("#login_text");
const signUpForm = document.querySelector(".signup_form");
const loginForm = document.querySelector(".login_form");

let signUpLogin;
signUpLogin = "login";

signupText.addEventListener("click", (e) => {
  signUpLogin = "login";
  signUpForm.classList.add("hide");
  signupText.classList.add("hide");
  loginForm.classList.remove("hide");
  loginText.classList.remove("hide");
});

loginText.addEventListener("click", (e) => {
  signUpForm.classList.remove("hide");
  signupText.classList.remove("hide");
  loginForm.classList.add("hide");
  loginText.classList.add("hide");
});

if (signUpLogin == "login") {
  signUpForm.classList.add("hide");
  signupText.classList.add("hide");
} else {
  loginForm.classList.add("hide");
  loginText.classList.add("hide");
}

// Sign up function
signupButton.addEventListener("click", (e) => {
  e.preventDefault();
  const name = signupName.value;
  const email = signupEmail.value;
  const password = signupPassword.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      if (user) {
        updateProfile(user, { displayName: name }).then(() => {
          sendEmailVerification(userCredential.user)
            .then(() => {
              // Send email verification
              alert(
                "Signed up successfully! Please check your email for verification."
              );
              window.location.reload();
            })
            .catch((error) => {
              alert("Error sending verification email: " + error.message);
            });
        });
      }
    })

    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.querySelector("#login_register").style.display = "none";
    const name = document.querySelector("#displayName");
    signoutButton.style.display = "inline";
    document.querySelector("#courses_link").style.display = "inline";
    document.querySelector("#sign-up").style.display = "none";
    document.querySelector("#courses").style.display = "block";
    // User is signed in
    name.innerHTML = user.displayName;
  } else {
    // User is signed out
    console.log("User is signed out");
  }
});

// // Sign in function
signinButton.addEventListener("click", (e) => {
  e.preventDefault();
  const email = signinEmail.value;
  const password = signinPassword.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Signed in successfully!");
      window.location.reload();
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
});

// // Sign out function
signoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("Signed out successfully!");
      signoutButton.style.display = "none";
      window.location.reload();
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
});
