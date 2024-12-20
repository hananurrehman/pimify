export const getRandomCategory = async () => {
  const categories: string[] = ["Electronics", "Books", "Fashion"];
  const randomIndex = Math.floor(Math.random() * categories.length);
  console.log(categories[randomIndex]);
  return categories[randomIndex];
};
