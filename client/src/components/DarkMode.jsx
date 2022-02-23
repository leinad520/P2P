import React, { ChangeEventHandler } from 'react';

const setDark = () => {
  localStorage.setItem('theme', 'dark');
  document.documentElement.setAttribute('data-theme', 'dark');
}

const setLight = () => {
  localStorage.setItem('theme', 'light');
  document.documentElement.setAttribute('data-theme', 'light');
};

const storedTheme = localStorage.getItem('theme');

const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const defaultDark = storedTheme === 'dark' || (storedTheme === null && prefersDark);

if (defaultDark) {
  setDark();
}

const toggleTheme = (e) => {
  if (e.target.checked) {
    setDark();
  } else {
    setLight();
  }
};

function DarkMode() {
  return (
    <label className='darkswitch'>
      <input type='checkbox' onChange={(e) => toggleTheme(e)}
        defaultChecked={defaultDark}
      />
      <span className='round slider'></span>
    </label>
  )
}

export default DarkMode;