import { Errors } from "@domain/helpers"
import { DatabaseClient } from "@infra/gateways/database"
import { User } from "@prisma/client"

export type CommentDeleteRequest = {
  user: User
  id: string
}

export type CommentDeleteResponse = {}

export async function commentDelete(req: CommentDeleteRequest, db: DatabaseClient): Promise<CommentDeleteResponse> {
  const comment = await db.comment.delete({
    where: { id: req.id },
  })

  if (!comment) throw Errors.NOT_FOUND()

  return {}
}