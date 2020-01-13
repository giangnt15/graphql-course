const Subscription = {
    // subscription resolver for a subscription operation is an object containing
    // subscribe() method running every time a client try to subscribe to it
    count: {
        subscribe(parent, args, {
            db,
            pubSub,
            prisma
        }, info) {
            let count = 0;
            setInterval(() => {
                count++;
                pubSub.publish('count', {
                    count /* match up with the subscription name (here is count)*/
                }) //publish the change to chanel "count"
            }, 1000);
            //setup the chanel named "count"
            //here we are not return an integer
            return pubSub.asyncIterator('count')
        }
    },
    comment: {
        async subscribe(parent, {
            postId
        }, {
            db,
            pubSub,
            prisma
        }, info) {
            return prisma.subscription.comment({
                where: {
                    node: {
                        post: {
                            id: postId
                        }
                    }
                }
            }, info)
        }

    },
    post: {
        subscribe(parent, args, {
            db,
            pubSub,
            prisma
        }, info) {
            return prisma.subscription.post({
                where: {
                    node: {
                        published: true
                    }
                }
            }, info);
        }
    }
}

export default Subscription;