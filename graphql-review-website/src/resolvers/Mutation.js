import uuidv4 from 'uuid/v4';

const Mutation = {
    createUser(parent, args, {
        db
    }, info) {
        const {
            user
        } = args;
        const isMatch = db.users.some(u => u.email === user.email);
        if (!isMatch) {
            let newUser = {
                id: uuidv4(),
                ...user
            }
            db.users.push(newUser)
            return newUser;
        }
        throw new Error('Email taken');

    },
    deleteUser(parent, args, {
        db
    }, info) {
        const {
            id
        } = args;
        const userIndex = db.users.findIndex(user => user.id === id);
        if (userIndex < 0) {
            throw new Error("User not existed");
        }
        const user = db.users.splice(userIndex, 1)[0];
        db.posts = db.posts.filter(post => {
            const match = post.author === id;

            db.comments = db.comments.filter(comment => comment.post !== post.id);
            return !match;
        })
        db.comments = db.comments.filter(comment => comment.author === id)
        console.log(user);
        return user;
    },
    createPost(parent, args, {
        db,
        pubSub
    }, info) {
        const {
            data
        } = args;
        const userExisted = db.users.some(user => user.id === data.author);
        if (userExisted) {
            const post = {
                ...data,
                id: uuidv4()
            }
            db.posts.push(post);
            if (post.published) {
                pubSub.publish('post', {
                    // match up with the subscription name, here is post
                    // ||
                    // \/
                    post: {
                        // match up with the type return from post subscription here is PostSubscriptionPayload
                        mutation: "CREATED",
                        data: post
                    }
                });
            }
            return post;
        }
        throw new Error("User not existed");
    },
    deletePost(parent, args, {
        db,
        pubSub
    }, info) {
        const {
            id
        } = args;

        const postIndex = db.posts.findIndex(post => post.id === id);
        if (postIndex < 0) {
            throw new Error('Post not existed');
        }
        const post = db.posts.splice(postIndex, 1)[0];
        db.comments = db.comments.filter(comment => comment.post !== id);
        if (post.published) {
            pubSub.publish('post', {
                post: {
                    mutation: "DELETED",
                    data: post
                }
            })
        }
        return post;
    },
    updatePost(parent, args, {
        db,pubSub
    }, info) {
        const {
            id,
            data
        } = args;
        const post = db.posts.find(p => p.id === id);
        if (!post) throw new Error("Post not existed");

        if (data.title){
            post.title = data.title;
            
        }
        if (data.body){
            post.body = data.body;
            
        }

        if (typeof data.published === 'boolean') {
            if (post.published && !data.published) {
                pubSub.publish('post', {
                    post: {
                        mutation: "DELETED",
                        data: post
                    }
                })
            } else if (!post.published && data.published) {
                pubSub.publish('post', {
                    post: {
                        mutation: "CREATED",
                        data: post
                    }
                })
            }else {
                pubSub.publish('post', {
                    post: {
                        mutation: "UPDATED",
                        data: post
                    }
                })
            }
            post.published = data.published;
        }


        return post;
    },
    createComment(parent, args, {
        db,
        pubSub
    }, info) {
        const {
            data
        } = args;

        const userExisted = db.users.some(user => user.id === data.author);
        if (!userExisted) throw new Error("User not existed");
        const post1 = db.posts.find(p => p.id === data.post);
        if (!post1) throw new Error("Post not existed");
        if (!post1.published) throw new Error("Post not published");
        const comment = {
            id: uuidv4(),
            ...data
        }

        db.comments.push(comment);
        pubSub.publish(`comment ${data.post}`, {
            comment: {
                mutation: 'CREATED',
                data: comment
            }
        })
        return comment;

    },
    deleteComment(parent, {
        id
    }, {
        db,pubSub
    }, info) {
        const commentIndex = db.comments.findIndex(c => c.id === id);
        if (commentIndex < 0) throw new Error("Comment not existed");
        const deletedComment = db.comments.splice(commentIndex, 1)[0];
        pubSub.publish(`comment ${deletedComment.post}`, {
            comment: {
                mutation: 'DELETED',
                data: deletedComment
            }
        })
        return deletedComment;
    },
    updateComment(parent, args, {
        db,pubSub
    }, info) {
        const {
            id,
            data
        } = args;
        const comment = db.comments.find(c => c.id === id);
        if (!comment) throw new Error("Comment not existed");
        if (data.text) {
            comment.text = data.text;
        }
        pubSub.publish(`comment ${comment.post}`, {
            comment: {
                mutation: 'UPDATED',
                data: comment
            }
        })
        return comment;
    },
    updateUser(parent, args, {
        db
    }, info) {
        const {
            data,
            id
        } = args;
        const user = db.users.find(user => user.id === id);
        if (!user) throw new Error('User not existed');

        if (data.name) user.name = data.name;
        if (data.age !== undefined) user.age = data.age;
        if (data.email) {
            const emailTaken = db.users.some(user => user.email === data.email);
            if (emailTaken) throw new Error("Email taken!");
            user.email = data.email;
        }
        return user;
    }
}

export {
    Mutation as
    default
};