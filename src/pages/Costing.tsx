import PageHeader from '@components/common/PageHeader'

export default function Costing() {
  return (
    <>
      <PageHeader
        title="Cost Reports"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Cost Reports', active: true }
        ]}
      />
      
      <div style={{ padding: '24px' }}>
        <div style={{ color: 'var(--text-secondary)' }}>
          Cost reports content goes here...
        </div>
      </div>
    </>
  )
}
