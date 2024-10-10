import app from './src/app.js';


const PORT = process.env.PORT || 8085;


app.listen(PORT, () => {
  console.log('App is listening to port: ' + PORT);
});

