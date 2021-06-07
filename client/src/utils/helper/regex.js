module.exports.password = (data) => {
    const rg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/;
    if(!rg.test(data)) return false;
    return true;
}

module.exports.name = (data) => {
    const rg = /^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/i;
    if(!rg.test(data)) return false;
    return true;
}

module.exports.formatNumber = (count) => {
    return (count * 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}