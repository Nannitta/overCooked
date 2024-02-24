import Joi from 'joi';

export const registerUserSchema = Joi.object({
  companyName: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'El nombre de la empresa no puede estar vacío',
    'string.min': 'El nombre de la empresa debe tener mínimo 2 caracteres.',
    'string.max': 'El nombre de la empresa no puede tener más de 100 caracteres.',
    'any.required': 'El nombre de la empresa es obligatorio.'
  }),
  CIF: Joi.string().min(9).max(9).required().pattern(/^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/).messages({
    'string.empty': 'El CIF de la empresa no puede estar vacío',
    'string.min': 'El CIF de la empresa debe tener mínimo 9 caracteres.',
    'string.max': 'El CIF de la empresa no puede tener más de 9 caracteres.',
    'any.required': 'El CIF de la empresa es obligatorio.',
    'string.pattern.base': 'El CIF debe tener un formato válido.'
  }),
  email: Joi.string().email().max(100).required().messages({
    'string.empty': 'El email no puede estar vacío',
    'string.email': 'El email no es válido',
    'string.max': 'El email no puede tener más de 100 caracteres',
    'any.required': 'El email es obligatorio'
  }),
  password: Joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zñÑ\d@$!%*?&]{8,20}$/).messages({
    'string.empty': 'La contraseña no puede estar vacía',
    'string.pattern.base': 'La contraseña debe tener entre 8 y 20 caracteres, contener una minúscula, una mayúscula, un número y un caracter especial.',
    'any.required': 'La contraseña es obligatoria'
  }),
  phone: Joi.string().required().pattern(/^(\+?(\d{1,3}))?[-. ]?((\(\d{1,3}\))|\d{1,4})[-. ]?(\d{1,4})[-. ]?(\d{1,9})$/).messages({
    'string.empty': 'El número de teléfono no puede estar vacío',
    'string.pattern.base': 'El número de teléfono deber tener un formato válido',
    'any.required': 'El número de teléfono es obligatorio'
  }),
  address: Joi.string().min(2).max(250).required().messages({
    'string.empty': 'La dirección de la empresa no puede estar vacía',
    'string.min': 'La dirección de la empresa debe tener mínimo 2 caracteres.',
    'string.max': 'La dirección de la empresa no puede tener más de 250 caracteres.',
    'any.required': 'La dirección de la empresa es obligatoria.'
  }),
  city: Joi.string().min(2).max(100).required().pattern(/^[A-Za-zñÑ\sáéíóúÁÉÍÓÚüÜ]+$/u).messages({
    'string.empty': 'La ciudad no puede estar vacía',
    'string.min': 'La ciudad debe tener mínimo 2 caracteres.',
    'string.max': 'La ciudad no puede tener más de 100 caracteres.',
    'any.required': 'La ciudad es obligatoria.',
    'string.pattern.base': 'El nombre de la ciudad solo puede tener letras y espacios.'
  }),
  country: Joi.string().min(2).max(100).required().pattern(/^[A-Za-zñÑ\sáéíóúÁÉÍÓÚüÜ]+$/u).messages({
    'string.empty': 'El país no puede estar vacío',
    'string.min': 'El país debe tener mínimo 2 caracteres.',
    'string.max': 'El país no puede tener más de 100 caracteres.',
    'any.required': 'El país es obligatorio.',
    'string.pattern.base': 'El nombre del país solo puede tener letras y espacios.'
  }),
  province: Joi.string().max(100).required().pattern(/^[A-Za-zñÑ\sáéíóúÁÉÍÓÚüÜ]+$/u).messages({
    'string.empty': 'La provincia no puede estar vacía',
    'string.max': 'La provincia no puede tener más de 100 caracteres.',
    'any.required': 'La provincia es obligatoria.',
    'string.pattern.base': 'El nombre de la provincia solo puede tener letras y espacios.'
  }),
  postalCode: Joi.string().required().pattern(/^\d{4,10}$/).messages({
    'string.empty': 'El código postal no puede estar vacío',
    'string.pattern.base': 'El código postal debe tener 5 números.',
    'any.required': 'El código postal es obligatorio.'
  }),
  web: Joi.alternatives().try(Joi.string().empty(''), Joi.string().uri().messages({
    'string.domain': 'La url de la web debe ser un dominio válido.'
  }))
});
