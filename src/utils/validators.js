const textoNoContieneNumeros = (texto) => {
  return !/\d/.test(texto);
};

const contraseñaValida = (password) => {
  const regexMayuscula = /[A-Z]/;
  const regexMinuscula = /[a-z]/;
  const regexEspecial = /[!@#$%^&*(),.?":{}|<>]/;
  const regexNumero = /[0-9]/;
  return (
    password.length >= 8 &&
    regexMayuscula.test(password) &&
    regexMinuscula.test(password) &&
    regexEspecial.test(password) &&
    regexNumero.test(password)
  )
};

export { textoNoContieneNumeros, contraseñaValida };
