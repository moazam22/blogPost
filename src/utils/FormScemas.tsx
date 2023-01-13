import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const signupSchema = yup.object().shape({
  firstName: yup.string().matches(/^\S*$/, 'No spaces are allowed').required(),
  lastName: yup.string().matches(/^\S*$/, 'No spaces are allowed').required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const newPost = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  readTime: yup.string().required(),
  attachmentUrl: yup.mixed(),
});

export const editPost = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});

export const updateUser = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
});

export const userKey = yup.object().shape({
  email: yup.string().email().required()
});

export const resetPassword = yup.object().shape({
  password: yup.string().min(6).required(),
});