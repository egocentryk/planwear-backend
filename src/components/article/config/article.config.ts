import { registerAs } from '@nestjs/config';

export default registerAs('articles', () => ({
  foo: 'bar',
  order: 'DESC',
}));
