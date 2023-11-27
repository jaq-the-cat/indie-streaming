import { Errors } from "@domain/helpers"
import { DatabaseClient } from "@infra/gateways/database"
import { User } from "@prisma/client"
import { Decimal } from "@prisma/client/runtime/library"

export type TierCreateRequest = {
    user: User
    name: string
    price: number
}

export type TierCreateResponse = {
    id: string
}

export async function tierCreate(req: TierCreateRequest, db: DatabaseClient): Promise<TierCreateResponse> {
    if (!req.user.id)
        throw Errors.MISSING_ID()
    if (!req.name)
        throw Errors.MISSING_NAME()
    if (!req.price)
        throw Errors.MISSING_PRICE()

    const tier = await db.subscriptionTier.create({
        data: {
            creatorId: req.user.id,
            name: req.name,
            price: new Decimal(req.price),
        },
        select: { id: true }
    })

    return { id: tier.id }
}
