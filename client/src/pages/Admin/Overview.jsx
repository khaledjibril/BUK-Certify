import React from 'react';
import StatCard from '../../components/StatCard/StatCard';


export default function Overview() {
// For now placeholder values; later connect to API
const stats = [
{ title: 'Total Users', value: '1,248' },
{ title: 'Pending Approvals', value: '36' },
{ title: 'Certificates Issued', value: '892' },
{ title: 'QR Scans Today', value: '214' },
];


return (
<div>
<h1 style={{ marginBottom: 18 }}>System Overview</h1>


<div style={{ display:'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap:16 }}>
{stats.map((s) => <StatCard key={s.title} title={s.title} value={s.value} />)}
</div>


<section style={{ marginTop:20 }}>
<div style={{ background:'#fff', padding:16, borderRadius:12 }}>
<h3>Recent Activity</h3>
<ul>
<li>New user registration submitted — Amina Yusuf</li>
<li>Certificate verified — Matric: 18/ENG/345</li>
<li>QR scan from external device — IP: 196.6.12.11</li>
</ul>
</div>
</section>
</div>
);
}