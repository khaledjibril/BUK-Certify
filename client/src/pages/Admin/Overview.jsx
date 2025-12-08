import React, { useState, useEffect } from 'react';
import StatCard from '../../components/StatCard/StatCard';
import { Users, CheckCircle, FileText, QrCode, ArrowUp, ArrowDown, Sun, Moon, AlertCircle } from 'lucide-react';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { TooltipProvider, Tooltip, TooltipWrapper } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function Overview() {
  const [dateRange, setDateRange] = useState('7d');
  const [darkMode, setDarkMode] = useState(false);
  const [recentActivities, setRecentActivities] = useState([
    { type: 'user', desc: 'New user registration submitted — Amina Yusuf', time: '7 mins ago' },
    { type: 'user', desc: 'New user registration submitted — Joshua Daniel', time: '12 mins ago' },
    { type: 'user', desc: 'New user registration submitted — Abdulsamad Yahya', time: '20 mins ago' },
    { type: 'cert', desc: 'Certificate verified — Matric: 18/ENG/345', time: '43 mins ago' },
    { type: 'qr', desc: 'QR scan from external device — IP: 196.6.12.11', time: '1 hour ago' },
  ]);

  // Auto-refresh recent activities simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        type: ['user','cert','qr'][Math.floor(Math.random()*3)],
        desc: `Simulated activity — ${Math.floor(Math.random()*100)}`,
        time: 'Just now'
      };
      setRecentActivities(prev => [newActivity, ...prev.slice(0,4)]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Stats with trend and sparkline data
  const stats = [
    { title: 'Total Users', value: 1248, icon: <Users size={24}/>, trend:12, sparkline:[1100,1120,1150,1180,1200,1220,1248] },
    { title: 'Pending Approvals', value: 36, icon: <CheckCircle size={24}/>, trend:-5, sparkline:[50,48,45,42,40,38,36] },
    { title: 'Approved Requests', value: 236, icon: <CheckCircle size={24}/>, trend:8, sparkline:[200,210,220,225,230,235,236] },
    { title: 'Rejected Requests', value: 406, icon: <CheckCircle size={24}/>, trend:-9, sparkline:[400,405,410,402,408,406,406] },
    { title: 'Certificates Issued', value: 892, icon: <FileText size={24}/>, trend:8, sparkline:[800,820,840,860,870,880,892] },
    { title: 'QR Scans Today', value: 214, icon: <QrCode size={24}/>, trend:20, sparkline:[180,190,200,205,210,212,214] },
    { title: 'Total Certificate Scans', value: 314, icon: <QrCode size={24}/>, trend:15, sparkline:[200,220,240,260,280,300,314] },
  ];

  const healthMetrics = [
    { title: 'Active Users Today', value: 342, color:'#4f46e5' },
    { title: 'Failed Logins', value: 4, color:'#ef4444' },
    { title: 'Pending Certificates', value:36, color:'#f59e0b' },
    { title: 'System Uptime', value:'99.9%', color:'#10b981' },
    { title: 'Conversion Rate', value:'78%', color:'#6366f1' },
    { title: 'QR Success Rate', value:'92%', color:'#22c55e' },
  ];

  // Multi-metric chart
  const chartData = {
    labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    datasets:[
      { label:'Users', data:[1100,1120,1150,1180,1200,1220,1248], borderColor:'#4f46e5', backgroundColor:'rgba(79,70,229,0.1)', tension:0.3 },
      { label:'Certificates Issued', data:[800,820,840,860,870,880,892], borderColor:'#10b981', backgroundColor:'rgba(16,185,129,0.1)', tension:0.3 },
      { label:'QR Scans', data:[180,190,200,205,210,212,214], borderColor:'#f59e0b', backgroundColor:'rgba(245,158,11,0.1)', tension:0.3 },
    ]
  };

  // Pie chart for approvals
  const approvalPieData = {
    labels:['Approved','Rejected','Pending'],
    datasets:[{
      data:[236,406,36],
      backgroundColor:['#10b981','#ef4444','#f59e0b']
    }]
  };

  // Alerts widget
  const systemAlerts = [
    { msg:'Server CPU load high', level:'critical' },
    { msg:'Pending certificates approaching 50', level:'warning' },
    { msg:'New user registrations spike', level:'info' },
  ];

  return (
    <TooltipProvider>
    <div style={{
      padding:'20px', minHeight:'100vh',
      background: darkMode?'#1f2937':'#f5f5f5',
      color: darkMode?'#f5f5f5':'#111827'
    }}>
      {/* Header */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px'}}>
        <h1 style={{fontSize:'28px', fontWeight:'600'}}>BUK Certify Overview</h1>
        <div style={{display:'flex', gap:'12px', alignItems:'center'}}>
          <select value={dateRange} onChange={e=>setDateRange(e.target.value)} aria-label="Select Date Range"
            style={{padding:'6px 10px', borderRadius:'6px', border:'1px solid #ccc', background:darkMode?'#374151':'#fff', color:darkMode?'#f5f5f5':'#111827'}}>
            <option value="1d">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button onClick={()=>setDarkMode(!darkMode)} aria-label="Toggle Dark Mode"
            style={{padding:'6px', borderRadius:'6px', border:'none', background:darkMode?'#fbbf24':'#374151', color:'#fff', cursor:'pointer'}}>
            {darkMode?<Sun size={18}/>:<Moon size={18}/>}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'16px', marginBottom:'32px'}}>
        {stats.map(s=>(
          <StatCard key={s.title} title={s.title} value={<CountUp end={s.value} duration={1.5}/>} icon={s.icon}>
            <div style={{display:'flex', alignItems:'center', marginTop:'8px', fontSize:'12px', color:s.trend>=0?'green':'red'}}>
              {s.trend>=0?<ArrowUp size={14}/>:<ArrowDown size={14}/>} <span style={{marginLeft:'4px'}}>{s.trend}%</span>
            </div>
            <Line
              data={{labels:s.sparkline.map((_,idx)=>idx+1), datasets:[{data:s.sparkline,borderColor:s.trend>=0?'green':'red',backgroundColor:'transparent',tension:0.3,pointRadius:0}]}}
              options={{plugins:{legend:{display:false}}, scales:{x:{display:false},y:{display:false}}, responsive:true, maintainAspectRatio:false}}
              style={{height:'50px', marginTop:'6px'}}
            />
          </StatCard>
        ))}
      </div>

      {/* Multi-metric Chart */}
      <div style={{background:darkMode?'#374151':'#fff', padding:'20px', borderRadius:'12px', boxShadow:'0 4px 12px rgba(0,0,0,0.05)', marginBottom:'32px'}}>
        <h3 style={{marginBottom:'12px', fontSize:'20px', fontWeight:'500'}}>Weekly Trends</h3>
        <div style={{height:'250px'}}><Line data={chartData}/></div>
      </div>

      {/* Approval Pie Chart */}
      <div style={{display:'flex', gap:'16px', flexWrap:'wrap', marginBottom:'32px'}}>
        <div style={{flex:'1 1 300px', background:darkMode?'#374151':'#fff', padding:'16px', borderRadius:'12px', boxShadow:'0 4px 12px rgba(0,0,0,0.05)'}}>
          <h3 style={{marginBottom:'12px'}}>Approval Breakdown</h3>
          <Pie data={approvalPieData}/>
        </div>

        {/* Alerts Widget */}
        <div style={{flex:'1 1 300px', background:darkMode?'#374151':'#fff', padding:'16px', borderRadius:'12px', boxShadow:'0 4px 12px rgba(0,0,0,0.05)'}}>
          <h3 style={{marginBottom:'12px'}}>System Alerts</h3>
          <ul style={{listStyle:'none', padding:0}}>
            {systemAlerts.map((a,idx)=>(
              <li key={idx} style={{display:'flex', alignItems:'center', marginBottom:'8px'}}>
                <AlertCircle size={18} color={a.level==='critical'?'#ef4444':a.level==='warning'?'#f59e0b':'#10b981'} style={{marginRight:'8px'}}/>
                <span>{a.msg}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Activity */}
      <section style={{marginBottom:'32px'}}>
        <div style={{background:darkMode?'#374151':'#fff', padding:'20px', borderRadius:'12px', boxShadow:'0 4px 12px rgba(0,0,0,0.05)'}}>
          <h3 style={{marginBottom:'12px', fontSize:'20px', fontWeight:'500'}}>Recent Activity</h3>
          <ul style={{listStyle:'none', padding:0}}>
            {recentActivities.map((a,idx)=>(
              <motion.li key={idx} style={{display:'flex', alignItems:'center', marginBottom:'12px', cursor:'pointer'}} whileHover={{scale:1.02}}>
                <span style={{marginRight:'10px', color:'#4f46e5'}}>
                  {a.type==='user' && <Users size={20}/>}
                  {a.type==='cert' && <FileText size={20}/>}
                  {a.type==='qr' && <QrCode size={20}/>}
                </span>
                <span>{a.desc}</span>
                <span style={{marginLeft:'auto', fontSize:'12px', color:'#888'}}>{a.time}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick Actions */}
      <div style={{display:'flex', gap:'16px', flexWrap:'wrap', marginBottom:'32px'}}>
        <button style={{padding:'12px 16px', background:'#4f46e5', color:'#fff', borderRadius:'8px', border:'none', cursor:'pointer'}}>Approve Users</button>
        <button style={{padding:'12px 16px', background:'#10b981', color:'#fff', borderRadius:'8px', border:'none', cursor:'pointer'}}>Issue Certificate</button>
        <button style={{padding:'12px 16px', background:'#f59e0b', color:'#fff', borderRadius:'8px', border:'none', cursor:'pointer'}}>Export Report</button>
        <button style={{padding:'12px 16px', background:'#ef4444', color:'#fff', borderRadius:'8px', border:'none', cursor:'pointer'}}>Manage QR Codes</button>
      </div>

      {/* System Health Metrics */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'16px'}}>
        {healthMetrics.map((h,idx)=>(
          <div key={idx} style={{background:darkMode?'#1f2937':'#fff', padding:'16px', borderRadius:'12px', boxShadow:'0 4px 12px rgba(0,0,0,0.05)', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
            <span style={{fontSize:'14px', color:'#888', marginBottom:'8px'}}>{h.title}</span>
            <span style={{fontSize:'20px', fontWeight:'600', color:h.color}}>{h.value}</span>
          </div>
        ))}
      </div>
    </div>
    </TooltipProvider>
  );
}
