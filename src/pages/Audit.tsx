import PageHeader from '@components/common/PageHeader'

export default function Audit() {
  return (
    <>
      <PageHeader
        title="Audit Trail"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Audit Trail', active: true }
        ]}
      />
      
      <div style={{ padding: '24px' }}>
        <div style={{ color: 'var(--text-secondary)' }}>
          Audit trail content goes here...
        </div>
      </div>
    </>
  )
}
