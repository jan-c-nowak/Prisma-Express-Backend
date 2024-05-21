import { Prisma } from '@prisma/client'

const taskEssentialUpload = Prisma.validator<Prisma.TaskDefaultArgs>()({
    select: {
        title: true,
        content: true,
        done: true,
    },
});

const taskFullDownload = Prisma.validator<Prisma.TaskDefaultArgs>()({
    select: {
        id: true,
        title: true,
        content: true,
        done: true,
    },
});

type Task = {
    id: number,
    title: string,
    content: string,
    done: boolean,
    isEditing: boolean,
}

export type TaskEssentialUpload = Prisma.TaskGetPayload<typeof taskEssentialUpload>;
export type TaskFullDownload = Prisma.TaskGetPayload<typeof taskFullDownload>;
export {Task};
//https://www.prisma.io/docs/orm/prisma-client/type-safety/operating-against-partial-structures-of-model-types