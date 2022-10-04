const Topic = class {
    constructor(name, version, comments, user) {
        this.version = version;
        this.name = name;
        this.comments = comments;
        this.state = 'open';
        this.user = user;
    }

    addComment(comment) {
        this.comments.push(comment);
    }

    switchState () {
        (this.state === 'open') ? (this.state = 'close') : (this.state = 'open');
    }
}

const Comment = class { 
    constructor(user, message) {
        this.user = user;
        this.message = message;
    }
}

module.exports = { Topic, Comment };