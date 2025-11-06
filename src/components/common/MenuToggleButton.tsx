import { useAppDispatch } from '@redux/store'
import { toggleSidebar } from '@redux/slices/miscSlice'
import IconBtn from '@components/buttons/IconBtn'

interface MenuToggleButtonProps {
  className?: string
}

export default function MenuToggleButton({ className }: MenuToggleButtonProps) {
  const dispatch = useAppDispatch()

  const handleMenuToggle = () => {
    dispatch(toggleSidebar())
  }

  return (
    <IconBtn
      variant="gold"
      size="md"
      onClick={handleMenuToggle}
      aria-label="Toggle menu"
      className={className}
    >
      ☰
    </IconBtn>
  )
}
