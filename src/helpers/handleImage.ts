export const handleImageLink = (image: string) => {
  if (image?.includes("http")) {
    return image;
  } else {
    return `${process.env.NEXT_PUBLIC_MAIN_URL}/${image}`;
  }
};
