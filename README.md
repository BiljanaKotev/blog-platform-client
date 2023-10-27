# TravelHub

### Description

A community driven blog platform where travelers can share their adventures with each other.

### User Stories

 - Login in
 - Update profile pic
 - Create a blog post
 - Edit a blog post
 - Delete a blog post
 - Create a comment on a blog post
 - Delete a comment from a blog post
 - Edit a comment from a blog post

# Client/FrontEnd
### React Router Routes (React App)
| Path | Component | Permissions | Behavior|
|------|-----------|-------------|---------|
| /    | Homepage  | public      | HomePage|
| /signup| SignupPage| public | Signup form, link to login, navigate to login after signup|
| /login| LoginPage| public| Login form, link to signup, navigate to dashboard after logging in|
| /logout| LogoutPage| private| Navigate to homepage after logout, expire session|
| /dashboard| Dashboard| private|Shows all user blog posts, user can create a blog post, user can navigate to the blogfeed|
| /create-post| Createpost| private|Upload cover image for post and enter text for title and body, publish to the blog feed|
| /blog-feed| BlogFeed| private| All user posts are here, can click on any post and will navigate to the specific post|
| /blog-feed/:id| BlogPost| private| You can comment on the posts on this page you can navigate back to the blogfeed or dashboard|

 


### Components


### Services

# Server/Backend


### Models

User Model

```
  {
    name: {
      type: String,
      required: [true, 'Username is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
    },

    profilePicUrl: String,
  },
  {
    timestamps: true,
  }
);
```

Post Model

```
 {
    coverImg: {
      type: String,
      required: [true, 'Image is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required.'],
    },
    location: {
      type: String,
    },
    content: {
      type: String,
      required: [true, 'Content is required.'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);
```

Comment Model 

```
  {
    text: {
      type: String,
      required: [true, 'Text is required for the comment.'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
```

### API Endpoints(backend routes)


### Links

### Git

[Client repository link](https://github.com/BiljanaKotev/blog-platform-client)
[Server repository link](https://github.com/BiljanaKotev/blog-platform-server)
[Deployed App Link](https://travelhub-blog-platform.netlify.app/)

### Slides
[Slides Link](https://docs.google.com/presentation/d/1rRmb0dinrodXGL6Ko8RKr1U4Xho_2TkoxHBQhkBN0NE/edit?usp=sharing)
