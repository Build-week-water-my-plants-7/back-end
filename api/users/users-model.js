User.create = async (newUser) => {
    let insert = await sql.query("INSERT INTO user SET ?", newUser);
    if( insert.insertId ) {
        return insert.insertId;
    }
    else {
        return;
    }
};