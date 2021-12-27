const setLocal = (token) => {
  if(token) {
    localStorage.setItem('token', token);
  } else {
    return null;
  }
};

const getLocal = () => {
  const _token = localStorage.getItem('token');

  if(_token) {
    const token = JSON.parse(_token);

    return token
  } else {
    return null;
  }
};

const deleteLocal = () => {
  localStorage.removeItem('token');
};

export {setLocal, getLocal, deleteLocal};