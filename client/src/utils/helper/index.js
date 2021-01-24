module.exports.formatNumber = (count) => {
    return (count * 100).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}