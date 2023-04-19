
export const load = () => {
    //regex que soporte solo numeros impares
    const regex = new RegExp('^[13579]*$');
    console.log('TEST REGEX ' + regex.test('123456789'));

    //regex para palabras que empiecen con O y terminen con C
    const regex2 = new RegExp('^O.*C$');
    console.log('TEST REGEX OSC ' + regex2.test('OsC'));
    console.log('TEST REGEX OSCAR ' + regex2.test('Oscar'));

    //regex las cadenas de caracteres que tengan un 0 al inicio
    const regex3 = new RegExp('^0.*$');
    console.log('TEST REGEX 0 ' + regex3.test('0'));
    console.log('TEST REGEX 01 ' + regex3.test('01'));
    console.log('TEST REGEX 1 ' + regex3.test('1'));
}
