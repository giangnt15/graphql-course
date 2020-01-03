// import message, {name as myName,getGreeting} from './myModules';
// import add, {subtract} from './myOtherModules';

// console.log(add(1,2),subtract(3,4))

import {GraphQLServer} from 'graphql-yoga';

const typeDefs = `
    type User{
        id: ID!
        name: String!
        email: String!
        age: Int!
    }

    type Post{
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }

    type Query{
        me: User!
        add(a: Float!, b: Float!): Float!
        post: Post!
        getPostById(id: ID!): Post!
        posts: [Post!]!
    }

`

let posts = [{
    id: "post1",
    title: "My post",
    body: "Hello",
    published: false
},{
    id: "post2",
    title: "My post 2",
    body: "Hello again!",
    published: true
}]

const resolvers = {
    User: {
        name(parent/*parent here is the User returned from a query, a mutation or a subscription*/){
            return "Nguyen Giang" //override name field of all query or mutation or subscription returning User
        }
    },
    Query: {
        me(){
            return {
                id: "123",
                name: "Giang",
                email: "giangqwerty69@gmail.com"
            }
        },
        post(){
            return {
                id: "post1",
                title: "My post",
                body: "Hello",
                published: false
            }
        },
        add(parent,args,ctx,info){
            console.log('parent',parent);
            if (args.a!=null&&args.b!=null){
                return args.a+args.b;
            }else {
                throw new Error("Please supply both numbers");
            }
        },
        getPostById(parent,args,ctx,info){
            console.log(info)
            return posts.find(item=>item.id===args.id);
        },
        posts(){
            return posts;
        },
    }
}
const server = new GraphQLServer({
     typeDefs,
     resolvers
})

server.start({},()=>console.log("Running on port 4000"))

