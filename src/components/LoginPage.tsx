
import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase/firebase";

type LocationState = {
  from?: {
    pathname?: string;
  };
};

const LoginPage: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as LocationState | null;
  const redirectTo = locationState?.from?.pathname || "/cart";

  useEffect(() => {
    if (user) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, navigate, redirectTo]);

  const handleEmailAuth = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (isRegistering && password.length < 6) {
      setError("Your password must contain at least 6 characters.");
      return;
    }

    setSubmitting(true);

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
      }

      navigate(redirectTo, { replace: true });
    } catch (err: any) {
      const errorMessages: Record<string, string> = {
        "auth/email-already-in-use": "An account already exists with this email.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/invalid-credential": "Incorrect email or password.",
        "auth/weak-password": "Please choose a stronger password.",
        "auth/user-not-found": "No account was found with this email.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
      };

      setError(
        errorMessages[err.code] ||
        err.message ||
        "Authentication failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setMessage("");
    setSubmitting(true);

    try {
      await signInWithPopup(auth, googleProvider);
      navigate(redirectTo, { replace: true });
    } catch (err: any) {
      setError(err.message || "Google sign-in failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordReset = async () => {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage("Password reset instructions have been sent to your email.");
    } catch (err: any) {
      setError(err.message || "Unable to send password reset email.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600">Checking your account...</p>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isRegistering ? "Create your account" : "Welcome back"}
          </h1>

          <p className="text-gray-500 mt-2">
            {isRegistering
              ? "Join Nexus Gadgets and start shopping."
              : "Sign in to continue shopping with Nexus Gadgets."}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
              minLength={6}
              autoComplete={
                isRegistering ? "new-password" : "current-password"
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {!isRegistering && (
            <div className="text-right">
              <button
                type="button"
                onClick={handlePasswordReset}
                className="text-sm text-purple-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
          >
            {submitting
              ? "Please wait..."
              : isRegistering
                ? "Create Account"
                : "Sign In"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 border-t border-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={submitting}
          className="w-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 py-3 rounded-lg flex items-center justify-center gap-3 font-medium text-gray-700"
        >
          <span className="font-bold text-blue-600">G</span>
          Continue with Google
        </button>

        <div className="text-center mt-6 text-sm text-gray-600">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError("");
              setMessage("");
            }}
            className="ml-2 text-purple-600 font-semibold hover:underline"
          >
            {isRegistering ? "Sign In" : "Register"}
          </button>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-500 hover:text-purple-600">
            Back to shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

