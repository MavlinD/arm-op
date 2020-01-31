require('colors')
const fixtures = require('./fixtures/regex')

console.log(fixtures)


const inputs = {
    wagon_or_container: {// wagon_or_container
        regex: /^([А-Я]{2,4}\d{7})$/u,
        message: 'данные должны соответствовать маске АБ1234567 или АБВГ1234567',
    },
    consignment: {// consignment
        regex: /^([А-Я]{2}\d{6})$/u,
        message: 'данные должны соответствовать маске АБ123456',
    },
}



