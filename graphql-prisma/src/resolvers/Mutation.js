import uuidv4 from 'uuid/v4';

const Mutation = {
    async createUser(parent, args, {
        prisma
    }, info) {
        const {
            data
        } = args;
        const userExisted = await prisma.exists.User({
            email: data.email
        });
        console.log(userExisted)
        if (!userExisted) {
            return prisma.mutation.createUser({
                data: {
                    ...data
                }
            }, info)
        } else {
            throw new Error('Email taken');
        }

    },
    async deleteUser(parent, args, {
        prisma
    }, info) {
        const {
            id
        } = args;
        const userExisted = await prisma.exists.User({
            id
        })
        if (!userExisted) {
            throw new Error("User not existed");
        }
        return prisma.mutation.deleteUser({
            where: {
                id
            }
        });
    },
    async createPost(parent, args, {
        prisma,
        pubSub
    }, info) {
        const {
            data
        } = args;
        return prisma.mutation.createPost({
            data: {
                ...data,
                author: {
                    connect: {
                        id: data.author
                    }
                }
            },
        },info);
        // const userExisted = db.users.some(user => user.id === data.author);
        // if (userExisted) {
        //     const post = {
        //         ...data,
        //         id: uuidv4()
        //     }
        //     db.posts.push(post);
        //     if (post.published) {
        //         pubSub.publish('post', {
        //             // match up with the subscription name, here is post
        //             // ||
        //             // \/
        //             post: {
        //                 // match up with the type return from post subscription here is PostSubscriptionPayload
        //                 mutation: "CREATED",
        //                 data: post
        //             }
        //         });
        //     }
        //     return post;
        // }
        // throw new Error("User not existed");
    },
    deletePost(parent, args, {
        prisma,
        pubSub
    }, info) {
        const {
            id
        } = args;

        return prisma.mutation.deletePost({
            where: {
                id
            }
        },info);

        // const postIndex = db.posts.findIndex(post => post.id === id);
        // if (postIndex < 0) {
        //     throw new Error('Post not existed');
        // }
        // const post = db.posts.splice(postIndex, 1)[0];
        // db.comments = db.comments.filter(comment => comment.post !== id);
        // if (post.published) {
        //     pubSub.publish('post', {
        //         post: {
        //             mutation: "DELETED",
        //             data: post
        //         }
        //     })
        // }
        // return post;
    },
    updatePost(parent, args, {
        prisma,
        pubSub
    }, info) {
        const {
            id,
            data
        } = args;

        return prisma.mutation.updatePost({
            where: {
                id
            },
            data//if a field is not passed, meaning it's undefined, prisma ignore it and not updated the correspoding field
        },info);
        // const post = db.posts.find(p => p.id === id);
        // if (!post) throw new Error("Post not existed");

        // if (data.title) {
        //     post.title = data.title;

        // }
        // if (data.body) {
        //     post.body = data.body;

        // }

        // if (typeof data.published === 'boolean') {
        //     if (post.published && !data.published) {
        //         pubSub.publish('post', {
        //             post: {
        //                 mutation: "DELETED",
        //                 data: post
        //             }
        //         })
        //     } else if (!post.published && data.published) {
        //         pubSub.publish('post', {
        //             post: {
        //                 mutation: "CREATED",
        //                 data: post
        //             }
        //         })
        //     } else {
        //         pubSub.publish('post', {
        //             post: {
        //                 mutation: "UPDATED",
        //                 data: post
        //             }
        //         })
        //     }
        //     post.published = data.published;
        // }


        // return post;
    },
    createComment(parent, args, {
        prisma,
        pubSub
    }, info) {
        const {
            data
        } = args;

        return prisma.mutation.createComment({
            data: {
                ...data,
                author: {
                    connect: {
                        id: data.author
                    }
                },
                post: {
                    connect: {
                        id: data.post
                    }
                }
            }
        },info);

        // const userExisted = db.users.some(user => user.id === data.author);
        // if (!userExisted) throw new Error("User not existed");
        // const post1 = db.posts.find(p => p.id === data.post);
        // if (!post1) throw new Error("Post not existed");
        // if (!post1.published) throw new Error("Post not published");
        // const comment = {
        //     id: uuidv4(),
        //     ...data
        // }

        // db.comments.push(comment);
        // pubSub.publish(`comment ${data.post}`, {
        //     comment: {
        //         mutation: 'CREATED',
        //         data: comment
        //     }
        // })
        // return comment;

    },
    deleteComment(parent, {
        id
    }, {
        prisma,
        pubSub
    }, info) {
        return prisma.mutation.deleteComment({
            where: {
                id
            }
        },info);
        // const commentIndex = db.comments.findIndex(c => c.id === id);
        // if (commentIndex < 0) throw new Error("Comment not existed");
        // const deletedComment = db.comments.splice(commentIndex, 1)[0];
        // pubSub.publish(`comment ${deletedComment.post}`, {
        //     comment: {
        //         mutation: 'DELETED',
        //         data: deletedComment
        //     }
        // })
        // return deletedComment;
    },
    updateComment(parent, args, {
        prisma,
        pubSub
    }, info) {
        const {
            id,
            data
        } = args;
        return prisma.mutation.updateComment({
            where: {
                id
            },
            data
        },info);
        // const comment = db.comments.find(c => c.id === id);
        // if (!comment) throw new Error("Comment not existed");
        // if (data.text) {
        //     comment.text = data.text;
        // }
        // pubSub.publish(`comment ${comment.post}`, {
        //     comment: {
        //         mutation: 'UPDATED',
        //         data: comment
        //     }
        // })
        // return comment;
    },
    async updateUser(parent, args, {
        prisma
    }, info) {
        const {
            data,
            id
        } = args;
        
        return prisma.mutation.updateUser({
            where: {
                id
            },
            data
        },info);
    }
}

export {
    Mutation as
    default
};