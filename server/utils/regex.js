module.exports.password = (data) => {
    const rg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/;
    if(!rg.test(data)) return false;
    return true;
}