import { auth } from './firebase';
import { 
  signInWithEmailAndPassword as firebaseSignInWithEmail, 
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  User
} from 'firebase/auth';

export const signInWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
  const userCredential = await firebaseSignInWithEmail(auth, email, password);
  return userCredential.user;
};

export const signUpWithEmailAndPassword = async (email: string, password: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const signInWithGoogle = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  return userCredential.user;
};

export const signOut = (): Promise<void> => {
  return firebaseSignOut(auth);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};