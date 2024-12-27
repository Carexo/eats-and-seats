db.createCollection("users");

db.createUser({
    user: "admin",
    pwd: "password",
    roles: ["dbOwner"],
});
