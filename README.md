# Todo nextjs application
This app is made using nextjs typescript

it uses todo-api which also created using typescript: https://github.com/BudiartoSalim/todo-api

register will automatically logs you in if it is successful, password is hashed but feel free to just register dummy data.

email MUST BE an email format.

# Features
- Simple CRUD where each person can create, update the status, and delete their own todos
- Tracks each person's todo separately; if you're logged in as A, you can't see B's todos
- Todos have 3 different status: Started, In progress, Finished
- Change todo status with simple button click, button only appear if it is valid (no "progress" button on finished todo, for example)
