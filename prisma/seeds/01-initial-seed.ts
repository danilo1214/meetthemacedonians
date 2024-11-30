import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.drink.createMany({
    data: [
      {
        name: "Rakija",
        mkName: "Ракија",
      },
      {
        name: "Wine",
        mkName: "Вино",
      },
      {
        name: "Beer",
        mkName: "Пиво",
      },
      {
        name: "Whiskey",
        mkName: "Виски",
      },
      {
        name: "Gin",
        mkName: "Џин",
      },
      {
        name: "Vodka",
        mkName: "Водка",
      },
      {
        name: "Soft Drink",
        mkName: "Безалкохолни пијалоци",
      },
    ],
  });

  await prisma.foodType.createMany({
    data: [
      {
        name: "Traditional Macedonian",
        mkName: "Традиционална македонска",
      },
      {
        name: "Mexican",
        mkName: "Мексичка",
      },
      {
        name: "Italian",
        mkName: "Италијанска",
      },
      {
        name: "Chinese",
        mkName: "Кинеска",
      },
      {
        name: "Barbecue",
        mkName: "Скара",
      },
      {
        name: "Healthy",
        mkName: "Здрава кујна",
      },
    ],
  });

  await prisma.language.createMany({
    data: [
      {
        name: "English",
      },
      {
        name: "Macedonian",
      },
      {
        name: "Turkish",
      },
      {
        name: "Serbian",
      },
      {
        name: "German",
      },
      {
        name: "French",
      },
      {
        name: "Albanian",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
