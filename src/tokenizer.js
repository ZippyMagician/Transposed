module.exports = (code) => {
    return code.replace(/#\s?.+|\s+\n/g, '\n').split('\n').map(item => item.split(' ').map(operator => { return { num: operator.split('')[0], op: operator.split('')[1] }; }));
}