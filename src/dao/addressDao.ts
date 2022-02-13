import { PrismaClient, address } from '@prisma/client';
const prisma = new PrismaClient();

let addressDao = {

    async fetch(): Promise<address[] | undefined> {
        const result = await prisma.address.findMany({
            include: {
                _count: true
            }
        })

        return result
    },

    async index(addressId: string) : Promise<address | undefined> {
        const result = await prisma.address.findFirst({
            where: { id: addressId },
            include: {
                _count: true
            }
        })
        return result
    },

    async store(data: address): Promise<address | undefined> {
        const result = await prisma.address.create({
            data
        })

        return result
    },

    async update(data: address, addressId: string): Promise<address | undefined> {
        data.updated_at = new Date()
        const result = await prisma.address.update({
            data,
            where: {
                id: addressId,
            }
        })

        return result
    },

    async delete(addressId: string): Promise<address | undefined> {

        const result = await prisma.address.delete({
            where: { id: addressId }
        })

        return result
    }
}

export default addressDao