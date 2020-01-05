// import message, {name as myName,getGreeting} from './myModules';
// import add, {subtract} from './myOtherModules';

// console.log(add(1,2),subtract(3,4))

import {
    GraphQLServer,
    PubSub
} from 'graphql-yoga';
import db from './db';
import User from './resolvers/User';
import Mutation from './resolvers/Mutation';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import Query from './resolvers/Query';
import Subscription from './resolvers/Subscription';
import prisma from './prisma';

const pubSub = new PubSub();

const resolvers = {
    User,// custom type resolver
    Post,// custom type resolver
    Comment,// custom type resolver
    Query,
    Mutation,
    Subscription
}

// path in nodejs start from the root of the application
// var fs = require('fs');
// fs.readFile('./.babelrc',"utf-8",(err,data)=>{console.log(data)});

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql', //relative to the root of the application
    resolvers,
    context: { // context can be an object or a function returning an object
        db,
        pubSub,
        prisma
    }
})

server.start({}, () => console.log("Running on port 4000"))