import React from 'react';


export default function SecurityLogs() {
return (
<div>
<h1>Security & Audit Logs</h1>
<div style={{ marginTop:12, background:'#fff', padding:16, borderRadius:10 }}>
<ul>
<li>2025-11-12 10:34 — Admin login from 41.73.22.5</li>
<li>2025-11-12 11:02 — Certificate verified — Matric 19/LAW/221</li>
<li>2025-11-13 09:20 — Failed admin login attempt — 203.0.113.9</li>
</ul>
</div>
</div>
);
}