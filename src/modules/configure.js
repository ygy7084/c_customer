const configure =
  {
    SERVER: '',
    API: '/api',
    STATIC: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '',
  };
export default configure;
