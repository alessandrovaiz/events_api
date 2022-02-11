import { PrismaClient, company } from '@prisma/client';
const prisma = new PrismaClient();

let companyDao = {

    async fetch(): Promise<company[] | undefined> {
        const result = await prisma.company.findMany({
            where: { is_active: true },
            orderBy: { name: 'asc' },
            include: {
                _count: true,
                company_addresses: {
                    select: {
                        address: true
                    },
                }
            }
        })
        return result
    },

    async index(companyId: string) : Promise<company | undefined> {
        const result = await prisma.company.findFirst({
            where: { id: companyId },
            include: {
                _count: true,
                company_addresses: {
                    select: {
                        address: true
                    },
                }
            }
        })
        return result
    },

    async store(data: company): Promise<company | undefined> {
        const result = await prisma.company.create({
            data
        })

        return result
    },

    async update(data: company, companyId: string): Promise<company | undefined> {
        data.updated_at = new Date()
        const result = await prisma.company.update({
            data,
            where: {
                id: companyId,
            }
        })

        return result
    },

    async delete(companyId: string): Promise<company | undefined> {
        const result = await prisma.company.update({
            where: { id: companyId },
            data: {
                is_active: false,
                updated_at: new Date()
            }
        })

        return result
    }
}

export default companyDao