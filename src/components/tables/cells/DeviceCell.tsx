import '@styles/components/sessions-table.scss'

interface DeviceCellProps {
  device: string
  deviceIcon: string
  deviceInfo?: string
}

export default function DeviceCell({ device, deviceIcon, deviceInfo }: DeviceCellProps) {
  return (
    <div className="device-info">
      <span className="device-icon">{deviceIcon}</span>
      <div>
        <div className="device-name">{device}</div>
        {deviceInfo && (
          <div className="device-details">{deviceInfo}</div>
        )}
      </div>
    </div>
  )
}
