export const parseStrapiObject = (data: { id: number; attributes: any }) => {
  const { id, attributes } = data;
  return { id, ...attributes };
};
