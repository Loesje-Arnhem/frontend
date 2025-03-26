import netlifyDriver from "unstorage/drivers/netlify-blobs";

export default defineNitroPlugin(async () => {
  const storage = useStorage();
  const runtimeConfig = useRuntimeConfig();

  if (import.meta.dev) {
    return;
  }

  const driver = netlifyDriver({
    name: "loesje",
    siteID: runtimeConfig.netlify.siteId,
    token: runtimeConfig.netlify.token,
  });
  storage.mount("blob", driver);
  await storage.clear("blob");
});
