db.createCollection("users");
db.createCollection("dish");

db.createUser({
    user: "admin",
    pwd: "password",
    roles: ["dbOwner"],
});
