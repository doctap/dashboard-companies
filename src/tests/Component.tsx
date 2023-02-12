import React, { useEffect, useState } from 'react';

export const Component = () => {
  const [data, setData] = useState(false);
  const [toggle, setToggle] = useState(false);

  const name = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 100);
  }, []);

  return (
    <div>
      {toggle && <div data-testId='testId-div'>toggle</div>}
      {data && <div style={{ color: 'red' }}>data</div>}
      <div>component</div>
      <button data-testId='testId-button' onClick={name}>click</button>
    </div>
  );
};
