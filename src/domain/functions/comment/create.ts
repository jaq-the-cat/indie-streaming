import { DatabaseClient } from "@infra/gateways/database"
import { User } from "@prisma/client"

export type CommentCreateRequest = {
    user: User
    postId: string
    parentId?: string
    text: string
}

export type CommentCreateResponse = {
    id: string
}

export async function commentCreate(req: CommentCreateRequest, db: DatabaseClient): Promise<CommentCreateResponse> {
    const comment = await db.comment.create({
        data: {
            userId: req.user.id,
            text: req.text,
            postId: req.postId,
            parentId: req.parentId ?? null
        },
        select: {
            id: true,
        }
    })
    return comment
}