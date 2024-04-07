const bcrypt = require('bcrypt');
function hashPassword(password){
const harshedPassword = bcrypt.hash(password, 10);
return harshedPassword
}

module.exports = hashPassword