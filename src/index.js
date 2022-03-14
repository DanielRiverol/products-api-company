import app from './app'
import './database'

//Server listening
app.listen(app.get('PORT'), () => {
    console.log(`Server running on port ${app.get('PORT')}`)
})
