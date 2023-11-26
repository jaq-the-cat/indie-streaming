import { App } from './app'
import { cors } from '@infra/middlewares/cors'
import dotenv from 'dotenv'
dotenv.config()

const startApplication = async () => {
    try {
        const expressApplication = new App()

        expressApplication.app.use(cors)

        expressApplication.app.listen(process.env.PORT, () =>
            console.log(`[API] Server running at http://localhost:${process.env.PORT}`)
        )
    } catch (e) {
        console.error('====================================')
        console.error(e)
        console.error('====================================')
    }
}

startApplication()