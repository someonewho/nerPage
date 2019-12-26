const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema(
    {
        account: {type: String, required: true },  // Mongoose에서 에러를 바로 만들어서 이거는 안 하는게 좋을듯 , unique: true},
        accountname: {type: String, required: true},
        phonenum: {type: String, required: true},
        password: {type: String, required: true},
        cardcompany: {type: String, required: true},
        cardnum: {type: String, required: true},
        reservation: {type: Array}, // 예약 목록이 없을 수도 있음.
        bookmarks: {type: Array} // 즐겨찾기 목록이 없을 수도 있음.
    },
    {
        collection: 'User',
        versionKey: false
    }
);

// To login
UserSchema.statics.login = function(account) {
    const login_result = this.findOne({account})
    return login_result
}

// To register User Information
UserSchema.statics.register = function(account, accountname, phonenum, password, cardcompany, cardnum) {
    var NewUser = new this({account, accountname, phonenum, password, cardcompany, cardnum})

    const register_result = NewUser.save()

    return register_result;
}

// To modify User Information
UserSchema.statics.modify = function(account, accountname, phonenum, password, cardcompany, cardnum) {
    const modify_result = this.findOneAndUpdate({account}, {accountname, phonenum, password, cardcompany, cardnum}, {new: true});

    // { new: true } : return the modified document rather than the original. Default is false.
    return modify_result
}

UserSchema.statics.updateResvList = function(account, reservation) {
    const modify_result = this.findOneAndUpdate({account}, {reservation}, {new: true});

    // { new: true } : return the modified document rather than the original. Default is false.
    return modify_result
}

// To return User's bookmarks
UserSchema.statics.returnBookmarks = function(account) {
    // Find User by ID
    // Return Account's Bookmarks

    var User = new mongoose.model('User', UserSchema);
    const bookmarks = User.login(account)
        .then((user) => {
            if(user) {
                return {bookmarks: user['bookmarks']}
            }
            else {
                return {error: 2}
            }
        })
        .catch(err => {
            console.log(err)
            return {error: 3}
        })
    return bookmarks
}

// To add User's bookmarks
UserSchema.statics.addBookmarks = function(account, bookmarks) {
    const modify_result = this.findOneAndUpdate({account}, {bookmarks}, {new: true});

    // { new: true } : return the modified document rather than the original. Default is false.
    return modify_result
}

module.exports = mongoose.model('User', UserSchema);
