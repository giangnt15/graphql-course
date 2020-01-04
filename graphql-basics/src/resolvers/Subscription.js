const Subscription = {
    // subscription resolver for a subscription operation is an object containing
    // subscribe() method running every time a client try to subscribe to it
    count: {
        subscribe(parent, args, {db, pubSub}, info){
            let count = 0;
            setInterval(()=>{
                count++;
                pubSub.publish('count',{count/* match up with the subscription name (here is count)*/})//publish the change to chanel "count"
            },1000);
            //setup the chanel named "count"
            //here we are not return an integer
            return pubSub.asyncIterator('count')
        }
    },
    comment: {
        subscribe(parent,{postId},{db,pubSub},info){
            const post = db.posts.find(p=>p.id===postId&&p.published);
            if (!post) throw new Error("Post not found!");

            return pubSub.asyncIterator(`comment ${postId}`);
        }
    },
    post: {
        subscribe(parent, args, {db,pubSub}, info){
            return pubSub.asyncIterator('post')
        }
    }
}

export default Subscription;