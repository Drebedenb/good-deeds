import React, { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch('http://localhost:5000/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nameTag: name,
        password,
      }),
    });
    await router.push('/authorization');
  };

  return (
    <div className="mainPage flex pt-[20rem]">
      <div className="w-[100%]">
        <div className="w-[20rem] border-2 p-4 rounded bg-zinc-700 text-center mx-auto">
          <h1 className="text-2xl">Registration</h1>
          <br />
          <form onSubmit={submit}>
            <h2>Username</h2>
            <input
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
            />
            <h2>Password</h2>
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />
            <button className="px-2 m-3 border-2 rounded" type="submit">
              Register
            </button>
          </form>
          <p>
            If you already have an account you can
            <button
              className="text-blue-500"
              onClick={() => router.push('/authorization')}
            >
              &nbsp;login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
