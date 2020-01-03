// import message, {name as myName,getGreeting} from './myModules';
// import add, {subtract} from './myOtherModules';

// console.log(add(1,2),subtract(3,4))

import {
    GraphQLServer
} from 'graphql-yoga';

const typeDefs = `
    type User{
        id: ID!
        name: String!
        email: String!
<<<<<<< HEAD
        age: Int
        posts: [Post!]!
=======
        grades: [Float!]!
        age: Int!
>>>>>>> e71c1f276c3dff2da3da8d4442b74783f47ea0e8
    }

    type Post{
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }


    type Query{
        me: User!
<<<<<<< HEAD
        users(query: String): [User!]! 
        add(a: Float!, b: Float!): Float!
=======
        add(numbers: [Float!]!): Float!
>>>>>>> e71c1f276c3dff2da3da8d4442b74783f47ea0e8
        post: Post!
        getPostById(id: ID!): Post!
        posts(query: String): [Post!]!
    }

`

let posts = [{
    id: "post1",
    title: "My post",
    body: "Hello",
    published: false,
    author: 'user1'
}, {
    id: "post2",
    title: "My post 2",
    body: "Hello again!",
    published: true,
    author: 'user2'

}, {
    id: "post3",
    title: "Hello",
    body: "Hello again!",
    published: true,
    author: 'user3'
}, {
    id: "post4",
    title: "Hello",
    body: "Hello again!",
    published: true,
    author: 'user1'
}]

let users = [{
    id: "user1",
    name: "Nguyen Giang",
    email: "giangnt15@gmail.com",
    age: 21,
    posts: ['post1','post4']
}, {
    id: "user2",
    name: "Nguyen Son",
    email: "sonnt13@gmail.com",
    age: 16,
    posts: ['post2']
}, {
    id: "user3",
    name: "Nguyen Thanh",
    email: "thanhnt20@gmail.com",
    age: 16,
    posts: ['post3']
}]

    
const resolvers = {
    User: {
        // name() {
        //     return "Nguyen Giang" //override name field of all query or mutation or subscription returning User
        // },
        posts(parent,args,ctx,info){
            return posts.filter(post=>parent.posts.findIndex(p=> p===post.id)>=0);
        }
    },
    Post: {
        author(parent,args,ctx,info){
            return users.find(user=> user.id===parent.author);

        }
    },
    Post: {
        body(parent,args){
            console.log("parent",parent)
            console.log("args",args)
            return "This is a body"
        }
    },
    Query: {
        users(parent, {
            query
        }, ctx, info) {
            if (!query) {
                return users;
            } else {
                return users.filter(user => user.name.toLowerCase().indexOf(query.toLowerCase()) >= 0);
            }
        },
        me() {
            return {
                id: "123",
                name: "Giang",
                email: "giangqwerty69@gmail.com",
                grades: [10,20,30,40]
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

        add(parent,{numbers},ctx,info){
            if (numbers.length>0){
                return numbers.reduce((cur,n)=> cur+n);
            }
            else {
                throw new Error("Please supply both numbers");
            }
        },
        getPostById(parent, args, ctx, info) {
            console.log(info)
            return posts.find(item => item.id === args.id);
        },
        posts(parent, {
            query
        }, ctx, info) {
            if (!query) return posts;
            return posts.filter(post => post.title.toLowerCase().indexOf(query.toLowerCase()) >= 0);
        },
    }
}
const server = new GraphQLServer({
     typeDefs,
     resolvers,
})

server.start({}, () => console.log("Running on port 4000"))