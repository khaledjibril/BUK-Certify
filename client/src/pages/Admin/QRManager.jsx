import React from 'react';


export default function QRManager() {
return (
<div>
<h1>QR Manager</h1>
<div style={{ marginTop:12, background:'#fff', padding:16, borderRadius:10 }}>
<p>Generate and manage secure QR codes mapped to certificate records.</p>
<button style={{ marginTop:12, padding:'8px 14px', borderRadius:8, background:'#0b6ef6', color:'#fff', border:'none' }}>Generate QR</button>
</div>
</div>
);
}