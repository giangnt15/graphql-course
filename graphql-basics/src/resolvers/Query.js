const Query = {
    comments(parent, args, {
        db
    }, info) {
        console.log(db.comments)
        return db.comments;
    },
    users(parent, {
        query
    }, {
        db
    }, info) {
        if (!query) {
            return db.users;
        } else {
            return db.users.filter(user => user.name.toLowerCase().indexOf(query.toLowerCase()) >= 0);
        }
    },
    me() {
        return {
            id: "123",
            name: "Giang",
            email: "giangqwerty69@gmail.com",
            grades: [10, 20, 30, 40]
        }
    },
    post() {
        return {
            id: "post1",
            title: "My post",
            body: "Hello",
            published: false
        }
    },

    add(parent, {
        numbers
    }, {
        db
    }, info) {
        if (numbers.length > 0) {
            return numbers.reduce((cur, n) => cur + n);
        } else {
            throw new Error("Please supply both numbers");
        }
    },
    getPostById(parent, args, {
        db
    }, info) {
        console.log(info)
        return db.posts.find(item => item.id === args.id);
    },
    posts(parent, {
        query
    }, {
        db
    }, info) {
        if (!query) return db.posts;
        return db.posts.filter(post => post.title.toLowerCase().indexOf(query.toLowerCase()) >= 0);
    },
}

export default Query;