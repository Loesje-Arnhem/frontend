export default defineNitroPlugin(async () => {
  const storage = useStorage("cache");
  await storage.clear();
});
