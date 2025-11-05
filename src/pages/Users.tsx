import PageHeader from '@components/common/PageHeader'

export default function Users() {
  return (
    <>
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
