import app from './app';

app.get('/', (req, res) => {
    return res.status(200).send('MB events is working!!')
})
app.listen(3333, () => {
  console.log('Server listening on port 3333');
});
