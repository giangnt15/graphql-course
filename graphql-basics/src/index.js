// import message, {name as myName,getGreeting} from './myModules';
// import add, {subtract} from './myOtherModules';

// console.log(add(1,2),subtract(3,4))

import {
    GraphQLServer
} from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

const typeDefs = `
    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post{
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment{
        id: ID!
        text: String!
        author: User!
        post: Post!
    }

    type Query{
        me: User!
        users(query: String): [User!]! 
        add(numbers: [Float!]!): Float!
        post: Post!
        getPostById(id: ID!): Post!
        posts(query: String): [Post!]!

        comments: [Comment!]!
    }
    type Mutation{
        createUser(name: String!, email: String!, age: Int): User!
        createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
        createComment(text: String!, author: ID!, post: ID!): Comment!
        updateUser(id: ID!, name: String, email: String, age: Int): User!
    }
`

let posts = [{
    id: "post1",
    title: "My post",
    body: "Hello",
    published: false,
    author: 'user1',
    comments: ['1','3']
}, {
    id: "post2",
    title: "My post 2",
    body: "Hello again!",
    published: true,
    author: 'user2',
    comments: ['2']

}, {
    id: "post3",
    title: "Hello",
    body: "Hello again!",
    published: true,
    author: 'user3',
    comments: ['4']

}, {
    id: "post4",
    title: "Hello",
    body: "Hello again!",
    published: true,
    author: 'user1',
    comments: []
}]

let users = [{
    id: "user1",
    name: "Nguyen Giang",
    email: "giangnt15@gmail.com",
    age: 21,
    posts: ['post1','post4'],
    comments: ['1','2']
}, {
    id: "user2",
    name: "Nguyen Son",
    email: "sonnt13@gmail.com",
    age: 16,
    posts: ['post2'],
    comments: ['3']

}, {
    id: "user3",
    name: "Nguyen Thanh",
    email: "thanhnt20@gmail.com",
    age: 16,
    posts: ['post3'],
    comments: ['4']

}]

let comments = [{
    id: '1',
    text: 'This is a comment',
    author: 'user1',
    post: 'post1'
},{
    id: '2',
    text: 'This is a comment 2',
    author: 'user1',
    post: 'post2'

},{
    id: '3',
    text: 'This is a comment 3',
    author: 'user2',
    post: 'post1'

},{
    id: '4',
    text: 'This is a comment 4',
    author: 'user3',
    post: 'post3'

}]
    
const resolvers = {
    User: {
        // name() {
        //     return "Nguyen Giang" //override name field of all query or mutation or subscription returning User
        // },
        posts(parent,args,ctx,info){
            return posts.filter(post=>parent.posts.findIndex(p=> p===post.id)>=0);
        },
        comments(parent,args,ctx,info){
            return comments.filter(comment=>comment.author===parent.id);
        }
    },
    Post: {
        author(parent,args,ctx,info){
            return users.find(user=> user.id===parent.author);

        },
        comments(parent,args,ctx,info){
            return comments.filter(comment=>comment.post===parent.id);
        }
    },
    Comment:{
        author(parent,args,ctx,info){
            return users.find(user=>user.id===parent.author);
        },
        post(parent,args,ctx,info){
            return posts.find(post=>post.id===parent.post);
        }
    },
    Mutation: {
        createUser(parent,args,ctx,info){
            const {name,email,age} = args;
            const isMatch = users.some(user=> user.email===email);
            if (!isMatch){
                let user = {id: uuidv4(), name, email,age}
                users.push(user)
                return user;
            }
            throw new Error('Email taken');

        },
        createPost(parent,args,ctx,info){
            const {title,body,published,author} = args;
            const userExisted = users.some(user=>user.id===author);
            if (userExisted){
                const post = {
                    title,
                    body,
                    published,
                    author,
                    id: uuidv4()
                }
                posts.push(post);
                return post;
            }
            throw new Error("User not existed");
        },
        createComment(parent,args,ctx,info){
            const {text,author,post} = args;

            const userExisted = users.some(user=>user.id===author);
            if (!userExisted) throw new Error("User not existed");
            const post1 = posts.find(p=>p.id===post);
            if (!post1) throw new Error("Post not existed");
            if (!post1.published) throw new Error("Post not published");
            const comment = {
                id: uuidv4(),
                text,
                author,
                post
            }

            comments.push(comment);
            return comment;

        },
        updateUser(parent,args,ctx,info){
            const {id, name,email,age} = args;
            const user = users.find(user=>user.id===id);
            if (!user) throw new Error('User not existed');
            if (name) user.name = name;
            if (age) user.age = age;
            if (email) user.email =email;
            return user;
        }
    },
    Query: {
        comments(parent,args,ctx,info){
            return comments;
        },
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