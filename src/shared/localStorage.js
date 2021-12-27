const setToken = (token) => {
  if(token) {
    localStorage.setItem('token', token);
  } else {
    return null;
  }
};

const getToken = () => {
  const _token = localStorage.getItem('token');

  if(_token) {
    const token = JSON.parse(_token);

    return token
  } else {
    return null;
  }
};

const deleteToken = () => {
  localStorage.removeItem('token');
};

export {setToken, getToken, deleteToken};