import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs'
const prisma = new PrismaClient();

async function main() {

    let adminRole = await prisma.role.create({
        data: {
            id: 'c62b6c96-db52-45d5-bdba-c15627b89c9d',
            code: 0,
            name: 'Admin',
        }
    })

    let defaultRole = await prisma.role.create({
        data: {
            id: '4c4a3481-f76a-4b20-a588-6ed3bc5139bb',
            code: 0,
            name: 'Default',
        }
    })

    let userPassword = bcrypt.hashSync('123456', 8)
    let user = await prisma.user.create({
        data: {
            id: 'f30502d9-5d82-43cb-ae70-30d5d926dde2',
            first_name: 'Alessandro',
            last_name: 'Vaiz',
            email: 'alessandrovaiz@gmail.com',
            password: userPassword, // 123456
            avatar_url: 'https://github.com/alessandrovaiz.png',
            role: {
                connect: {
                    id: adminRole.id
                },
            },
        }
    })

    let userAddress = await prisma.address.create({
        data: {
            id: 'f4e4c423-cd90-40ec-807b-04efcba2f2b0',
            street: 'Rua Marechal Deodoro',
            number: '84',
            complement: 'Casa',
            district: 'Loteamento Teste',
            city: 'São Miguel do Oeste',
            state: 'Santa Catarina',
            zipcode: '13080-655'
        }
    })

    await prisma.user_addresses.create({
        data: {
            user_id: user.id,
            address_id: userAddress.id 
        }
    })

    let universityCompanyType = await prisma.company_type.create({
        data: {
            id: '508d3983-8be5-49e4-affc-a5f9c2ca203d',
            code: 0,
            name: 'Universidade',
        }
    })

    let companyCompanyType = await prisma.company_type.create({
        data: {
            id: '556253d2-e4ed-4b4f-9899-010d020523c1',
            code: 1,
            name: 'Empresa',
        }
    })

    let mbLabsAddress = await prisma.address.create({
        data: {
            id: '72d12e1d-8ab9-41d4-9583-3b9946e43210',
            street: 'Avenida Joao Scarparo Netto',
            number: '84',
            complement: 'Bloco d sala 06',
            district: 'Loteamento Center Santa Genebra',
            city: 'Campinas',
            state: 'São Paulo',
            zipcode: '13080-655'
        }
    })

    let mbLabs = await prisma.company.create({
        data: {
            id: '6bd69fb6-93f3-4e33-86d7-40a0c1909fcf',
            name: 'MBLABS SERVICOS DE TECNOLOGIA LTDA',
            trading_name: 'MBLABS',
            cnpj: '18.870.181/0001-72',
            email: 'mblabs@teste.com',
            phone: '49999999999',
            thumbnail_url: 'https://github.com/MBLabsDev.png',
            is_active: true,
            company_type: {
                connect: {
                    id: companyCompanyType.id
                }
            },
        }
    })

    await prisma.company_addresses.create({
        data: {
            company_id: mbLabs.id,
            address_id: mbLabsAddress.id
        }
    })

    let eventMbLabs = await prisma.event.create({
        data: {
            name: 'Inauguração mb labs',
            description: 'Inauguração com festa do henrique e juliano para a galera!!',
            event_date: new Date(2023, 1, 1, 1, 1),
            company_id: mbLabs.id,
            thumbnail_url: 'https://github.com/MBLabsDev.png',
            is_active: true,
        }
    })

    await prisma.address_event.create({
        data: {
            address_id: mbLabsAddress.id,
            event_id: eventMbLabs.id
        }
    })

    let eventTicket = await prisma.ticket.create({
        data: {
            id: '394faf89-1b3a-41f7-8fcd-4f07d0c6f238',
            code: 0,
            expiration_date: new Date(2023, 1, 1, 1, 1),
            event: {
                connect: {
                    id: eventMbLabs.id
                }
            }

        }
    })

    let ticketBatch = await prisma.batch.create({
        data: {
            id: 'b3bc1493-91ce-4c7d-aad9-a5697c8d1151',
            amount: 100,
            batch_effective_date: new Date(),
            ticket_price: 50.00,
            is_active: true,
            ticket_id: eventTicket.id
         }
    })


}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})