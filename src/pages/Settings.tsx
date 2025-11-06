import { PrimaryBtn, SecondaryBtn } from '@components/buttons'
import { PageTopBar } from '@components/common'
import PageHeader from '@components/common/PageHeader'
import { getRouteByKey } from '@utils/helpers'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const navigate = useNavigate()

  const handleSaveChanges = () => {
    alert('Profile updated successfully!');
  }

  const handleCancelClick = () => {
    navigate(getRouteByKey('dashboard'))
  }

  return (
    <>
      {/* Top Bar with Page Title and Actions */}
      <PageTopBar
        leftContent={
          <div className="page-title">Profile & Settings</div>
        }
        rightContent={
          <>
            <PrimaryBtn onClick={handleSaveChanges}>
              Save Changes
            </PrimaryBtn>
            <SecondaryBtn onClick={handleCancelClick}>
              Cancel
            </SecondaryBtn>
          </>
        }
      />

      <div style={{ padding: '24px' }}>
        <div style={{ color: 'var(--text-secondary)' }}>
          Settings content goes here...
        </div>
      </div>
    </>
  )
}
