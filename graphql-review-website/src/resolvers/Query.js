const Query = {
   
    async users(parent, {
        query
    }, {
        prisma
    }, info) {
       return await prisma.query.users(null, info);
    },
}

export default Query;