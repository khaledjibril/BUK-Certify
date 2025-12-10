// mockAPI.js — Mock verification API

export async function mockVerifyAPI(id) {
  await new Promise(r => setTimeout(r, 700));
  if (!id) return { ok:false, reason:'EMPTY_INPUT' };
  if (id.includes('00121')) return {
    ok:true,
    id,
    name:'Muhammad Abdullahi',
    program:'B.Sc Computer Science',
    faculty:'Computing',
    issued:'2025-07-12',
    hash:'0x9fae21bcbad8721d0921'
  };
  return { ok:false, reason:'NOT_FOUND' };
}
