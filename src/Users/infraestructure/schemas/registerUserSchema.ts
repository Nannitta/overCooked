/*
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
  })
});
 */
