import {
    Prisma
} from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466/reviews/dev',//identical to the one in prisma.yml
});

// prisma.query.users(null, `{id name email posts{ id title } }`)
// .then(data=>console.log(JSON.stringify(data,undefined,2)))
// .catch(err=>console.log(err))

// prisma.query.comments(null, `{id text post{ id title } author{email name id} }`)
// .then(data=>console.log(JSON.stringify(data,undefined,2)))
// .catch(err=>console.log(err))

// prisma.mutation.updatePost({
//     where: {
//         id: 'ck50mkeso017e0738ja0h7lze'
//     },
//     data: {
//         body: "Hello world again 23645454",
//         published: true,
//     }
// },`{id title body published}`).then(data=>console.log(JSON.stringify(data,undefined,2)))

// prisma.query.posts(null, `{id title body published }`)
// .then(data=>console.log(JSON.stringify(data,undefined,2)))
// .catch(err=>console.log(err))

// prisma.exists.User({AND: [{id: "ck50jv05e00hc0738xhc11kmo",name: "Gian2g"}]}).then(data=>console.log(data))

// prisma.mutation.deleteUser({where: {email: "giangqwerty69@gmail.com"}},`{id}`).then(data=>console.log(data))

export default prisma;