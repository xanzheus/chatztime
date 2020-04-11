const users = [];

// User bergabung
function userJoin(id, username, room){
    const user = {id, username, room};

    users.push(user);

    return user;
}

// User lama
function getCurrentUser(id){
    return users.find(user => user.id === id);
}

// user keluar
function userLeave(id){
    const index = users.findIndex(user => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

// room users
function getRoomUsers(room){
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};