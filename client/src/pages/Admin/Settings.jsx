import React from 'react';


export default function Settings() {
return (
<div>
<h1>System Settings</h1>
<div style={{ marginTop:12, background:'#fff', padding:16, borderRadius:10 }}>
<p>Configure email, verification rules, and admin accounts here.</p>
<button style={{ marginTop:12, padding:'8px 14px', borderRadius:8, background:'#fff', border:'1px solid #e6e9ef' }}>Edit Settings</button>
</div>
</div>
);
}