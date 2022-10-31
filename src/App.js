import { auth } from './firebase';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userObjOrNull) => {
      setUser(userObjOrNull)
    });

    return () => {
      unsubscribe();
    }

  }, []);


  return (
    <div className='App'>
      <Header user={user}/>
      <Main user={user}/>
      <Footer />
    </div>
  );
}