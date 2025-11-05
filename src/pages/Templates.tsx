import PageHeader from '@components/common/PageHeader'

export default function Templates() {
  return (
    <>
      <PageHeader
        title="Templates"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Templates', active: true }
        ]}
      />
      
      <div style={{ padding: '24px' }}>
        <div style={{ color: 'var(--text-secondary)' }}>
          Templates content goes here...
        </div>
      </div>
    </>
  )
}
