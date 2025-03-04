import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  AuthError,
  getIdToken
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { AuthContextType, AuthUser } from '../types/auth';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const mapFirebaseUser = (user: FirebaseUser): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
});

// Function to get user-friendly error messages
const getFriendlyErrorMessage = (error: Error): string => {
  const errorCode = (error as AuthError).code;
  
  switch (errorCode) {
    case 'auth/invalid-credential':
      return 'Invalid credentials. Please check your email and password and try again.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please check your email or create a new account.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please use a different email or sign in.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use a stronger password.';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful login attempts. Please try again later or reset your password.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before completing the sign in. Please try again.';
    default:
      return error.message;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Display toast notification when error changes
  useEffect(() => {
    if (error) {
      const friendlyMessage = getFriendlyErrorMessage(error);
      toast.error(friendlyMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser(mapFirebaseUser(firebaseUser));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Get the Firebase ID token
      const idToken = await getIdToken(result.user);
      
      // Send the token to the backend
      const response = await axios.post(`${API_URL}/auth/google`, { id_token: idToken });
      
      // Log both tokens but highlight the Firebase ID token which is needed for Swagger
      console.log('\n=== Firebase ID Token (Use this for Swagger UI) ===');
      console.log(`Bearer ${idToken}`);
      console.log('===============================================\n');
      
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred during Google sign-in'));
      throw err;
    }
  };

  const signInWithEmailPassword = async (email: string, password: string) => {
    try {
      setError(null);
      
      // First authenticate with Firebase to get the ID token
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await getIdToken(userCredential.user);
      
      // Call the backend API for email/password login
      const response = await axios.post(`${API_URL}/auth/login/email`, { email, password });
      
      // Log both tokens but highlight the Firebase ID token which is needed for Swagger
      console.log('\n=== Firebase ID Token (Use this for Swagger UI) ===');
      console.log(`Bearer ${idToken}`);
      console.log('===============================================\n');
      
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred during email/password sign-in'));
      throw err;
    }
  };

  const registerWithEmailPassword = async (email: string, password: string, fullName?: string) => {
    try {
      setError(null);
      
      // Call the backend API for registration
      const response = await axios.post(`${API_URL}/auth/register`, { 
        email, 
        password,
        full_name: fullName || "" // Use the provided fullName or empty string
      });
      
      // After successful registration, authenticate with Firebase to get the ID token
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await getIdToken(userCredential.user);
      
      // Log both tokens but highlight the Firebase ID token which is needed for Swagger
      console.log('\n=== Firebase ID Token (Use this for Swagger UI) ===');
      console.log(`Bearer ${idToken}`);
      console.log('===============================================\n');
      
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred during registration'));
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
      // You might want to call a backend logout endpoint here if needed
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred during sign-out'));
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithEmailPassword,
    registerWithEmailPassword,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 