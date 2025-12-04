import DashboardCard from './DashboardCard';
import DashboardLayout from '../../pages/DashboardLayout';
import './AdminDashboard.css';

const AdminDashboard = ({ user }) => {
  const stats = 2;

 

  if (!stats===2) return <p>Loading...</p>;

  return (
    <DashboardLayout user={user}>
      <div className="admin-dashboard">
        <h1>Welcome, {user.name}</h1>
        <div className="dashboard-cards">
          <DashboardCard title="Total Students" value={stats.students} />
          <DashboardCard title="Certificates Issued" value={stats.certificates} />
          <DashboardCard title="Verifications" value={stats.verifications} />
          <DashboardCard title="Verifiers" value={stats.verifiers} />
        </div>

        <div className="recent-section">
          <h2>Recent Certificate Verifications</h2>
          <table className="recent-table">
            <thead>
              <tr>
                <th>Certificate No</th>
                <th>Student</th>
                <th>Verifier</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentVerifications.map((log) => (
                <tr key={log.id}>
                  <td>{log.certificate_no}</td>
                  <td>{log.student_name}</td>
                  <td>{log.verifier_name}</td>
                  <td>{new Date(log.timestamp).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
