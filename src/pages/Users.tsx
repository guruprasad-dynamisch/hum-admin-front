import PageHeader from '@components/common/PageHeader'
import PageTopBar from '@components/common/PageTopBar'
import PrimaryBtn from '@components/buttons/PrimaryBtn'
import SecondaryBtn from '@components/buttons/SecondaryBtn'

export default function Users() {
  const handleAddUser = () => {
    console.log('Add user clicked')
    // TODO: Open add user modal
  }

  const handleExport = () => {
    console.log('Export clicked')
    // TODO: Implement export functionality
  }

  return (
    <>
      {/* Top Bar with Page Title and Actions */}
      <PageTopBar
        leftContent={
          <div className="page-title">User Management</div>
        }
        rightContent={
          <>
            <PrimaryBtn onClick={handleAddUser} icon={<span>➕</span>}>
              Add User
            </PrimaryBtn>
            <SecondaryBtn onClick={handleExport} icon={<span>📥</span>}>
              Export
            </SecondaryBtn>
          </>
        }
      />

      {/* Page Header with Breadcrumbs */}
      <PageHeader
        title="User Management"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'User Management', active: true }
        ]}
      />
      
      <div style={{ padding: '24px' }}>
        <div style={{ color: 'var(--text-secondary)' }}>
          User management content goes here...
        </div>
      </div>
    </>
  )
}
