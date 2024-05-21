import express, {Request, Response} from 'express';
import cors from 'cors';
import { PrismaClient, Task } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
app.use(express.json());
app.use(cors());



async function main() {
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
        
        app.get('/todos', async (request: Request, response: Response) => {
            
            const user = await prisma.task.findMany()
            
            return response.json({
                status: "OK",
                data: user,
            });
        });

        app.post('/todos', async (request: Request, response: Response) => {
            const task : Task = request.body;

            const result = await prisma.task.create({
                data: task
            })

            return response.json({
                status: "OK",
                data: result,
            });
        });

        app.patch('/todos/:id', async (request: Request, response: Response) => {
            const id = parseInt(request.params.id);

            const updateUser = await prisma.task.update({
                where: {
                    id: id,
                },
                data: {
                    title: request.body.title,
                    content: request.body.content,
                    done: request.body.done,
                },
            })

            return response.json({
                status: "ok",
                data: updateUser,
            })

        });

        app.delete('/todos/:id', async (request: Request, response: Response) => {
            const id = parseInt(request.params.id);
            
            const deleteUser = await prisma.task.delete({
                where: {
                    id: id,
                },
            })

            return response.json({
                status: "ok",
                data: deleteUser,
            })
        });

    console.log("Eth");
});
}

main()
    .then(async () => {
        
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })