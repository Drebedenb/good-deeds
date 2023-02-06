import Navigation from '@/components/Navigation';
import MyDeeds from '@/components/MyDeeds';
import { useEffect, useState } from 'react';

export default function Home() {
  let content = { deeds: [] };
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:5000/users/user', {
          credentials: 'include',
        });
        content = await response.json();
        console.log(content);
        if (content.message === 'Unauthorized') {
          setAuth(false);
        } else {
          setAuth(true);
        }
      } catch (e) {
        console.log(e);
        setAuth(false);
      }
    })();
  });
  return (
    <div className="mainPage">
      <Navigation auth={auth} />
      <div className="pt-[10%]">
        <p className="gradientText mx-auto font-bold">Good Deeds</p>
        {auth ? (
          <MyDeeds content={content} />
        ) : (
          <div>Вы не вошли!</div>
        )}
      </div>
    </div>
  );
}
