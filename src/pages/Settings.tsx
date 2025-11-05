import PageHeader from '@components/common/PageHeader'

export default function Settings() {
  return (
    <>
      <PageHeader
        title="Settings"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Settings', active: true }
        ]}
      />
      
      <div style={{ padding: '24px' }}>
        <div style={{ color: 'var(--text-secondary)' }}>
          Settings content goes here...
        </div>
      </div>
    </>
  )
}
