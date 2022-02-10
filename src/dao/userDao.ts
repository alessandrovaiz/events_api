import { PrismaClient, Prisma, user, role } from '@prisma/client';
const prisma = new PrismaClient();

let userDao = {

    async fetch() {
        const result = await prisma.user.findMany({
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                is_active: true,
                avatar_url: true,
                role: true,
                created_at: true,
                updated_at: true,
                user_addresses: true,
                user_tickets: true,
                _count: true
            },
            where: {
                is_active: true
            },
            orderBy: {
                first_name: 'asc'
            }
        })

        return result
    },

    async index(userId: string) {
        const result = await prisma.user.findFirst({
            where: { id: userId },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                is_active: true,
                avatar_url: true,
                role: true,
                created_at: true,
                updated_at: true,
                user_addresses: true,
                user_tickets: true,
                _count: true
            }
        })
        return result
    },

    async findUserByEmail(email: string): Promise<user | undefined> {
        const result = await prisma.user.findFirst({ where: { email, is_active: true } })
        return result
    },

    async store(data: user): Promise<user | undefined> {
        let role: role
        if (data.role_id == undefined) {
            role = await prisma.role.findFirst({ where: { code: 0 } })
        } else {
            role = await prisma.role.findFirst({ where: { id: data.role_id } })
        }

        const result = await prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                first_name: data.first_name,
                last_name: data.last_name,
                is_active: data.is_active,
                role: {
                    connect: {
                        id: role.id,
                    }
                }
            }
        })

        delete result.password
        return result
    },

    async update(data: user, userId: string): Promise<user | undefined> {
        const result = await prisma.user.update({
            data: {
                email: data.email,
                password: data.password,
                first_name: data.first_name,
                last_name: data.last_name,
                is_active: data.is_active,
                role_id: data.role_id,
                updated_at: new Date()
            },
            where: {
                id: userId
            }
        })

        delete result.password
        return result
    },

    async delete(userId: string): Promise<user | undefined> {
        const result = await prisma.user.update({
            where: { id: userId },
            data: {
                is_active: false, 
                updated_at: new Date()
            }
        })

        return result
    }
}

export default userDao