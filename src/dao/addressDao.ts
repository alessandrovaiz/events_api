import { PrismaClient, address } from '@prisma/client';
const prisma = new PrismaClient();

let addressDao = {

    async fetch(): Promise<address[] | undefined> {
        const result = await prisma.address.findMany({
            include: {
                _count: true
            },
            orderBy: {
                created_at: 'desc'
            }
        })

        return result
    },

    async index(addressId: string): Promise<address | undefined> {
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

    async linkAddressWithEvent(addressId: string, eventId: string) {
        const result = await prisma.address_event.create({
            data: {
                event_id: eventId,
                address_id: addressId,
            }
        })

        return result
    },

    async linkAddressWithCompany(addressId: string, companyId: string) {
        const result = await prisma.company_addresses.create({
            data: {
                company_id: companyId,
                address_id: addressId,
            }
        })

        return result
    },

    async linkAddressWithUser(addressId: string, userId: string) {
        const result = await prisma.user_addresses.create({
            data: {
                user_id: userId,
                address_id: addressId,
            }
        })

        return result
    },

    async unlinkAddressFromEvent(addressId: string, eventId: string) {
        const result = await prisma.address_event.deleteMany({
            where: {
                address_id: addressId,
                event_id: eventId
            }
        })

        return result
    },

    async unlinkAddressFromCompany(addressId: string, companyId: string) {
        const result = await prisma.company_addresses.deleteMany({
            where: {
                address_id: addressId,
                company_id: companyId
            }
        })

        return result
    },

    async unlinkAddressFromUser(addressId: string, userId: string) {
        const result = await prisma.user_addresses.deleteMany({
            where: {
                address_id: addressId,
                user_id: userId
            }
        })

        return result
    },


    async delete(addressId: string): Promise<any | undefined> {

        const userAddress = prisma.user_addresses.deleteMany({
            where: {
                address_id: addressId,
            }
        })

        const companyAddress = prisma.company_addresses.deleteMany({
            where: {
                address_id: addressId,
            }
        })

        const eventAddress = prisma.address_event.deleteMany({
            where: {
                address_id: addressId,
            }
        })

        const address = prisma.address.delete({
            where: { id: addressId }
        })

        await prisma.$transaction([userAddress, companyAddress, eventAddress, address])

        return true
    }
}

export default addressDao