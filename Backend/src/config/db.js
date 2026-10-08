import pkg from "pg";

const {Pool} = pkg;

const pool = new Pool({
    user: "jaiyadav",
    hostname: "localhost",
    database:"Chat_app",
    password: "1234",
    port: "5432"
})

export default pool;