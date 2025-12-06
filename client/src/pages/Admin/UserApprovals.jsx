import React from 'react';


export default function UserApprovals() {
// placeholder list
const pending = [
{ id: 1, name: 'Amina Yusuf', email: 'amina@example.com' },
{ id: 2, name: 'Sadiq Bello', email: 'sadiq@example.com' },
{ id: 3, name: 'Ibrahim Musa', email: 'ibrahim@example.com' },
];


const approve = (id) => {
alert('Approve ' + id + ' — hook API here');
};
const reject = (id) => {
alert('Reject ' + id + ' — hook API here');
};


return (
<div>
<h1>Pending User Approvals</h1>
<div style={{ marginTop:12 }}>
{pending.map((p) => (
<div key={p.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'#fff', padding:12, borderRadius:10, marginBottom:8 }}>
<div>
<div style={{ fontWeight:700 }}>{p.name}</div>
<div style={{ fontSize:13, color:'#64748b' }}>{p.email}</div>
</div>


<div style={{ display:'flex', gap:8 }}>
<button onClick={() => approve(p.id)} style={{ padding:'8px 12px', borderRadius:8, background:'#0b6ef6', color:'#fff', border:'none' }}>Approve</button>
<button onClick={() => reject(p.id)} style={{ padding:'8px 12px', borderRadius:8, background:'#fff', border:'1px solid #e6e9ef' }}>Reject</button>
</div>
</div>
))}
</div>
</div>
);
}