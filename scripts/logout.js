// logout.js
import { auth } from "../firebase-config.js";
import { signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

export function logoutUser(redirectTo = "quotes.html") {
  signOut(auth).then(() => {
    window.location.href = redirectTo;
  });
}

