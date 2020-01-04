let db = {
    posts: [{
        id: "post1",
        title: "My post",
        body: "Hello",
        published: false,
        author: 'user1',
        comments: ['1', '3']
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
    }],

    users: [{
        id: "user1",
        name: "Nguyen Giang",
        email: "giangnt15@gmail.com",
        age: 21,
        posts: ['post1', 'post4'],
        comments: ['1', '2']
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

    }],

    comments: [{
        id: '1',
        text: 'This is a comment',
        author: 'user1',
        post: 'post1'
    }, {
        id: '2',
        text: 'This is a comment 2',
        author: 'user1',
        post: 'post2'

    }, {
        id: '3',
        text: 'This is a comment 3',
        author: 'user2',
        post: 'post1'

    }, {
        id: '4',
        text: 'This is a comment 4',
        author: 'user3',
        post: 'post3'

    }]
}
export default db;