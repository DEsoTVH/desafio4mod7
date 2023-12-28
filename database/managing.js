export const manageErrors = (code) => {
    switch (code) {
      case '22P02':
        return {
          status: 400,
          message: 'Formato no válido en el parámetro',
        };
      case '23502':
        return {
          status: 400,
          message: 'Falta información en el Query String/Campo de Tabla',
        };
      case '400':
        return {
          status: 400,
          message: 'Faltan datos papito, no sea asi.',
        };
      case '404':
        return {
          status: 404,
          message: 'No existe ese registro en la tabla',
        };
      default:
        return {
          status: 500,
          message: 'Nope señor, vaya a lavar.',
        };
    }
  };