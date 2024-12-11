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
        mkName: "Англиски",
      },
      {
        name: "Macedonian",
        mkName: "Македонски",
      },
      {
        name: "Turkish",
        mkName: "Турски",
      },
      {
        name: "Serbian",
        mkName: "Српски",
      },
      {
        name: "German",
        mkName: "Германски",
      },
      {
        name: "French",
        mkName: "Француски",
      },
      {
        name: "Albanian",
        mkName: "Албански",
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
