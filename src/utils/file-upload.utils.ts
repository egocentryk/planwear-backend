export const imageFilter = (
  req: any,
  file: string | any,
  callback: any
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed'), false);
  }

  return callback(null, true);
}

export const editFileName = (
  req: any,
  file: string | any,
  callback: any
) => {
  const name = file.originalname.split('.'); /* FIX THIS */
  const extenstion = name[1];
  const random = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

  return callback(null, `${name[0]}-${random}.${extenstion}`);
}
