import React from 'react';

const setDark = () => {
  localStorage.setItem('theme', 'dark');
  document.documentElement.setAttribute('data-theme', 'dark');
}

const setLight = () => {
  localStorage.setItem('theme', 'light');
  document.documentElement.setAttribute('data-theme', 'light');
};

setDark();
setLight();

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
      <input type='checkbox' onChange={(e) => toggleTheme(e)}/>
      <span className='round slider'></span>
    </label>
  )
}


export default DarkMode;