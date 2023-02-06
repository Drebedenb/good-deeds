import React, { SyntheticEvent, useState } from 'react';
import Deed from '@/components/Deed';

const MyDeeds = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {nameTag, friends, deeds} = props.content;
  console.log(nameTag, friends, deeds);
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = await fetch(`http://localhost:5000/deals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        title,
        description,
        owner: content.nameTag,
      }),
    });
  };
  return (
    <div>
      <form className="w-[35rem] p-5 border-2 rounded-md m-auto text-white ">
        <input
          className="block mx-auto"
          type="text"
          required
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          className="block mx-auto"
          type="text"
          required
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button
          className="px-2 m-3 border-2 rounded block mx-auto"
          onClick={submit}
          type="submit"
        >
          Make Deed
        </button>
      </form>
      <div className="container w-[35rem] p-5 border-2 rounded-md m-auto text-white ">
        {props.content.deeds.length === 0 ? (
          <div>Пока нет хороших дел(</div>
        ) : (
          props.content.deeds.map((item, i) => (
            <Deed key={i} title={item.title} description={item.description} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyDeeds;
