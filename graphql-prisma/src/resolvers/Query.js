const Query = {
    comments(parent, {
        query
    }, {
        prisma
    }, info) {
        if (!query)
            return prisma.query.comments(null, info)
        return prisma.query.comments({
            where: {
                text_contains: query
            }
        }, info);
    },
    async users(parent, {
        query
    }, {
        prisma
    }, info) {
        if (!query) {
            return await prisma.query.users(null, info);
        } else {
            return prisma.query.users({
                where: {
                    OR: [{
                        name_contains: query
                    }, {
                        email_contains: query
                    }]
                }
            })
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
        prisma
    }, info) {
        if (!query) {
            return prisma.query.posts(null, info);
        }
        const opArgs = {
            where: {
                OR: [{
                    title_contains: query
                }, {
                    body_contains: query
                }]
            }
        };
        return prisma.query.posts(opArgs, info);
    },
}

export default Query;