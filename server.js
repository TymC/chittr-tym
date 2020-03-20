
import AppState from './global';

export const getFollowers = async (userId, type) => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userId + '/' + type)
    .then(response => response.json())
    .then(responseJson => {
      result = responseJson;
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};
export const getFollowing = async (userId, type) => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userId + '/' + type)
    .then(response => response.json())
    .then(responseJson => {
      result = responseJson;
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};


export const followUser = async (userId) => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userId + '/follow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': AppState.authToken,
    },
    body: JSON.stringify({}),
  }).catch(error => {
    console.error(error);
  });

  return result;
};
export const unfollowUser = async (userId) => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userId + '/follow', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': AppState.authToken,
    },
  })
  .then(response => response.text())
  .then(responseText => {
    console.log("unfollowed: "+ responseText)
  result = responseText;
})
  .catch(error => {
    console.error(error);
  });

  return result;
};

export const searchUser = async query => {
  var result;
  var url = 'http://10.0.2.2:3333/api/v0.0.5/search_user?q=' + query;
  console.log(url);
  await fetch(url)
    .then(response => response.json())
    .then(responseJson => {
        console.log("found users: "+ responseJson)
      result = responseJson;
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const getChits = async () => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      result = responseJson;
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const postChit = async body => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': AppState.authToken,
    },
    body: body,
  })
    .then(response => response.json())
    .then(responseJson => {
      result = responseJson;
    })
    .catch(error => {
      console.error(error);
    });

  return result;
};

export const getChitPhoto = async chitId => {
  var result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/chits/' + chitId + '/photo')
    .then(response => {
      if (response.status == 200) {
        result = true;
      } else{
        result = false;
      }
    })
    .catch(error => {
      console.log(error);
      result = false;
    });

  return result;
};

export const setChitPhoto = async (body, chitId) => {
  return fetch('http://10.0.2.2:3333/api/v0.0.5/chits/' + chitId + '/photo', {
    method: 'POST',
    headers: {
      'Content-Type': 'image/jpeg',
      'X-Authorization': AppState.authToken,
    },
    body: body,
  })
    .then(response => {
      console.log('Picture Added!');
    })
    .catch(error => {
      console.error(error);
    });
};


export const logout = async () => {
  await fetch('http://10.0.2.2:3333/api/v0.0.5/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': AppState.authToken,
    },
    body: JSON.stringify({}),
  }).catch(error => {
    console.error(error);
  });
};

export const login = async (email, password) => {
  let result = 'invalid';
  await fetch('http://10.0.2.2:3333/api/v0.0.5/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(response => {
      if (response.status == 200) {
        result = response.json();
      }
    })
    .catch(error => {
      console.error(error);
    });

  return result;
};


export const getUserDetails = async userId => {
  let result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userId)
    .then(response => response.json())
    .then(responseJson => {
      result = responseJson;
    })
    .catch(error => {
      console.log(error);
    });

  return result;
};

export const createUser = async (given_name, family_name, email, password) => {
  let result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      given_name,
      family_name,
      email,
      password,
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      result = responseJson;
    })
    .catch(error => {
      console.error(error);
    });
  return result;
};

export const updateUser = async (email,password,given_name,family_name) => {
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + GLOBAL.currentUser, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': GLOBAL.authToken,
    },
    body: JSON.stringify(email,password,given_name,family_name),
  }).catch(error => {
    console.error(error);
  });
};

export const getUserPhoto = async userId => {
  let result;
  await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + userId + '/photo')
    .then(response => response.text())
    .then(responseText => {
      result = responseText;
    })
    .catch(error => {
      console.log(error);
    });
  return result;
};

export const setUserPhoto = async body => {
  return fetch('http://10.0.2.2:3333/api/v0.0.5/user/photo', {
    method: 'POST',
    headers: {
      'Content-Type': 'image/jpeg',
      'X-Authorization': GLOBAL.authToken,
    },
    body: body,
  })
    .then(response => {
      console.log('Picture Added!');
    })
    .catch(error => {
      console.error(error);
    });
};