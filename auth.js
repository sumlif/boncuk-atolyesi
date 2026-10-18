// Boncuk Atölyesi — ortak oturum yardımcıları (Supabase)
window.BA_CFG = {
  url: "https://jggqgifujyyvriwgabfi.supabase.co",
  key: "sb_publishable_Y5oxGUTIo67O6XsAMZ49sQ_OcyQ-H4F",
  domain: "boncuk-atolyesi.app"
};
window.baClient = window.supabase.createClient(BA_CFG.url, BA_CFG.key, {
  auth: { persistSession: true, autoRefreshToken: true, storageKey: "boncuk-auth" }
});
window.baUserName = u => String(u).trim().toLowerCase().split("@")[0];
window.baLoginEmail = u => `${baUserName(u)}@${BA_CFG.domain}`;
window.baUserOk = u => /^[a-z0-9][a-z0-9._-]{2,23}$/.test(String(u).trim().toLowerCase());
// Oturum ve profil: {session, profile} ya da null
window.baCurrent = async () => {
  const { data: { session } } = await baClient.auth.getSession();
  if (!session) return null;
  const { data: profile } = await baClient.from("profiles").select("*").eq("id", session.user.id).maybeSingle();
  return { session, profile };
};
