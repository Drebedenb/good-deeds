import React from 'react';
import { useRouter } from 'next/router';

const Navigation = (props) => {
  const router = useRouter();

  const logout = async () => {
    await fetch('http://localhost:5000/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    await router.push('/authorization');
  };
  return (
    <div className="flex h-[50px] px-5 text-white float-right">
      {props.auth ? (
        <div>
          <button
            className="px-2 m-3 border-2 rounded"
            onClick={() => router.push('/friends')}
          >
            Friends
          </button>
          <button
            onClick={logout}
            className="px-2 m-3 border-2 rounded border-red"
          >
            Log out
          </button>
        </div>
      ) : (
        <button
          onClick={() => router.push('/authorization')}
          className="px-2 m-3 border-2 rounded border-red"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navigation;
