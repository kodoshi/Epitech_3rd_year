/**
 * List services method, not implemented fully
 * @returns json
 */
export const listservices = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/services/`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * List services by user method, not implemented fully
 * @returns json
 */
export const listbyuser = (userId, tokenkey) => {
    return fetch(`${process.env.REACT_APP_API_URL}/services/by/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenkey}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Delete all discord services method, receives the userid and token, return the response of the backend result in json
 * @param {string} userId 
 * @param {string} tokenkey 
 * @returns json
 */
export const deleteAllDiscords = (userId, tokenkey) => {
    return fetch(`${process.env.REACT_APP_API_URL}/discord/all/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenkey}`,
        },
        body: JSON.stringify({ userId }),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Delete all astronauts services method, receives the userid and token, return the response of the backend result in json
 * @param {string} userId 
 * @param {string} tokenkey 
 * @returns json
 */
export const deleteAllAstronauts = (userId, tokenkey) => {
    return fetch(`${process.env.REACT_APP_API_URL}/astronaut/all/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenkey}`,
        },
        body: JSON.stringify({ userId }),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Delete all joke services method, receives the userid and token, return the response of the backend result in json
 * @param {string} userId 
 * @param {string} tokenkey 
 * @returns json
 */
export const deleteAllJokes = (userId, tokenkey) => {
    return fetch(`${process.env.REACT_APP_API_URL}/joke/all/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenkey}`,
        },
        body: JSON.stringify({ userId }),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Delete all trades services method, receives the userid and token, return the response of the backend result in json
 * @param {string} userId 
 * @param {string} tokenkey 
 * @returns json
 */
export const deleteAllTrades = (userId, tokenkey) => {
    return fetch(`${process.env.REACT_APP_API_URL}/trade/all/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenkey}`,
        },
        body: JSON.stringify({ userId }),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Delete all norris services method, receives the userid and token, return the response of the backend result in json
 * @param {string} userId 
 * @param {string} tokenkey 
 * @returns json
 */
export const deleteAllNorrises = (userId, tokenkey) => {
    return fetch(`${process.env.REACT_APP_API_URL}/norris/all/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenkey}`,
        },
        body: JSON.stringify({ userId }),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Creates a discord service method, receives the userid, data in the form of XMLHTTP and token, return the response of the backend result in json
 * @param {string} userId 
 * @param {string} tokenkey 
 * @returns json
 */
export const creatediscord = (userId, tokenkey, discordData) => {
    return fetch(`${process.env.REACT_APP_API_URL}/discord/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenkey}`,
        },
        // no need to stringify, we have FormData
        body: discordData,
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Creates a norris service method, receives the userid, data in the form of XMLHTTP and token, return the response of the backend result in json
 * @param {string} userId 
 * @param {string} tokenkey 
 * @returns json
 */
export const createnorris = (userId, tokenkey, norrisData) => {
    return fetch(`${process.env.REACT_APP_API_URL}/norris/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenkey}`,
        },
        // no need to stringify, we have FormData
        body: norrisData,
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Creates an astronaut service method, receives the userid, data in the form of XMLHTTP and token, return the response of the backend result in json
 * @param {string} userId 
 * @param {string} tokenkey 
 * @returns json
 */
export const createastronaut = (userId, tokenkey, astronautData) => {
    return fetch(`${process.env.REACT_APP_API_URL}/astronaut/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenkey}`,
        },
        // no need to stringify, we have FormData
        body: astronautData,
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Creates a joke service method, receives the userid, data in the form of XMLHTTP and token, return the response of the backend result in json
 * @param {string} userId 
 * @param {string} tokenkey 
 * @returns json
 */
export const createjoke = (userId, tokenkey, jokeData) => {
    return fetch(`${process.env.REACT_APP_API_URL}/joke/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenkey}`,
        },
        // no need to stringify, we have FormData
        body: jokeData,
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Creates a trade service method, receives the userid, data in the form of XMLHTTP and token, return the response of the backend result in json
 * @param {string} userId 
 * @param {string} tokenkey 
 * @returns json
 */
export const createtrade = (userId, tokenkey, tradeData) => {
    return fetch(`${process.env.REACT_APP_API_URL}/trade/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tokenkey}`,
        },
        // no need to stringify, we have FormData
        body: tradeData,
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const singlediscord = (discordId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/discord/${discordId}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};


export const removediscord = (discordId, tokenkey) => {
    return fetch(`${process.env.REACT_APP_API_URL}/discord/${discordId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenkey}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};