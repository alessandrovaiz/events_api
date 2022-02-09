import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

    let adminRole = await prisma.role.create({
        data: {
            code: 0,
            name: 'Default',
        }
    })

    let defaultRole = await prisma.role.create({
        data: {
            code: 0,
            name: 'Default',
        }
    })

    console.log(adminRole)

    let user = {
        first_name: 'Alessandro',
        last_name: 'Vaiz',
        email: 'alessandrovaiz@gmail.com',
        password: '123456', // 123456
        avatar_url: 'https://github.com/alessandrovaiz.png',
        role: {
            connect: {
                id: adminRole.id
            }
        }
    }

    await prisma.user.create({
        data: user
    })
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})