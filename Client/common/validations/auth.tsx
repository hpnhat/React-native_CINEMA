import Joi from "joi";

const phoneNumberSchema = Joi.string()
  .pattern(/^[0-9]+$/, "numbers")
  .min(10)
  .max(10)
  .required()
  .empty()
  .messages({
    "any.required": "Vui lòng nhập số điện thoại.",
    "string.pattern.name": "Số điện thoại chỉ được chứa các chữ số.",
    "string.min": "Số điện thoại phải có ít nhất {#limit} chữ số.",
    "string.max": "Số điện thoại chỉ được có tối đa {#limit} chữ số.",
  });

export const SignUpSchema = Joi.object({
  fullName: Joi.string().required().min(3).empty().messages({
    "any.required": "Vui lòng nhập họ và tên.",
    "string.min": "Họ phải có ít nhất {#limit} ký tự.",
    "string.empty": "Vui lòng nhập đầy đủ thông tin",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(3)
    .required()
    .empty()
    .messages({
      "string.email": "Vui lòng cung cấp địa chỉ email hợp lệ.",
      "any.required": "Vui lòng nhập địa chỉ email",
      "string.min": "Email phải có ít nhất {#limit} ký tự.",
      "string.empty": "Vui lòng nhập đầy đủ thông tin",
    }),
  phone: phoneNumberSchema,
  birthDate: Joi.date().less("2010-01-01").required().messages({
    "any.required": "Ngày sinh phải trước 01/01/2010.",
    "date.base": "Ngày sinh không hợp lệ.",
    "date.less": "Ngày sinh phải trước ngày 01/01/2010.",
  }),
  gender: Joi.string()
    .valid("male", "female", "unknown")
    .required()
    .empty()
    .messages({
      "any.required": "Vui lòng chọn giới tính.",
      "any.only": "Vui lòng chọn giới tính.",
      "string.empty": "Vui lòng nhập đầy đủ thông tin",
    }),
  password: Joi.string().min(6).required().empty().messages({
    "any.required": "Vui lòng nhập mật khẩu.",
    "string.empty": "Vui lòng nhập đầy đủ thông tin",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự.",
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({
      "any.required": "Vui lòng nhập mật khẩu.",
      "any.only": "Mật khẩu xác nhận phải khớp với mật khẩu đã nhập.",
    }),
});

export const SignInSchema = Joi.object({
  phone: phoneNumberSchema,
  password: Joi.string().min(6).required().empty().messages({
    "any.required": "Vui lòng nhập mật khẩu",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự.",
    "string.empty": "Vui lòng nhập mật khẩu",
  }),
});
