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
| /logout| LogoutPage| private| user only| Navigate to homepage after logout, expire session|
| /dashboard| Dashboard| private| user only| Shows all user blog posts, user can create a blog post, user can navigate to the blogfeed|
| /create-post| Createpost| private| user only| Upload cover image for post and enter text for title and body, publish to the blog feed|
| /blog-feed| BlogFeed| private| user only| All user posts are here, can click on any post and will navigate to the specific post|
| /blog-feed/:id| BlogPost| private| user only| You can comment on the posts on this page you can navigate back to the blogfeed or dashboard|
|/user-posts/:id| UserPost| private| user only| You can 
 


### Components


### Services

# Server/Backend


### Models

### API Endpoints(backend routes)


### Links

### Git

### Slides
