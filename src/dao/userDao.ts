import { PrismaClient, Prisma, user } from '@prisma/client';
const prisma = new PrismaClient();

let userDao = {

    async findUserByEmail(email: string): Promise<user | undefined> {
        const result = await prisma.user.findFirst({ where: { email } })
        return result
    },

    async store(data: user): Promise<user | undefined> {

        const defaultRole = await prisma.role.findFirst({ where: { code: 0 } })

        const result = await prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                first_name: data.first_name,
                last_name: data.last_name,
                role: {
                    connect: {
                        id: defaultRole.id,
                    }
                }
            }
        })
        return result
    },

}

export default userDao