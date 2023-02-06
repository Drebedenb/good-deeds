import React, { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/router';

const Authorization = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        nameTag: name,
        password,
      }),
    });
    await router.push('/');
  };
  return (
    <div className="mainPage flex pt-[20rem]">
      <div className="w-[100%]">
        <div className="w-[20rem] border-2 p-4 rounded bg-zinc-700 text-center mx-auto">
          <h1 className="text-2xl">Authorization</h1>
          <br />
          <form>
            <h2>Username</h2>
            <input
              type="text"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <h2>Password</h2>
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              className="px-2 m-3 border-2 rounded"
              onClick={submit}
              type="submit"
            >
              Login
            </button>
          </form>
          <p>
            If you don't have an account you can
            <button
              className="text-blue-500"
              onClick={() => router.push('/register')}
            >
              &nbsp;register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
