/*
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
 */
