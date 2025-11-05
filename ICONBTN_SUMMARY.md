# IconBtn Component - Quick Summary

## ✅ What Was Done

### Migrated IconBtn Component
- **From:** Material-UI IconButton with inline styles
- **To:** React Bootstrap Button with SCSS theme

### Files Updated
- ✅ `src/components/buttons/IconBtn.tsx` - Migrated to React Bootstrap
- ✅ `src/styles/components/icon-btn.scss` - New SCSS styles
- ✅ `src/styles/components/index.scss` - Added import
- ✅ `src/components/ProtectedLayout.tsx` - Uses DashboardHeader

## 🎨 New Features

### Variants
```tsx
<IconBtn variant="default">🔔</IconBtn>   // Gray (default)
<IconBtn variant="primary">✓</IconBtn>    // Gold background
<IconBtn variant="secondary">⚙️</IconBtn>  // Dark background
<IconBtn variant="danger">✕</IconBtn>     // Red
<IconBtn variant="success">✓</IconBtn>    // Green
<IconBtn variant="gold">⭐</IconBtn>      // Gold text
```

### Sizes
```tsx
<IconBtn size="sm">🔔</IconBtn>  // Small (18px)
<IconBtn size="md">🔔</IconBtn>  // Medium (20px) - default
<IconBtn size="lg">🔔</IconBtn>  // Large (24px)
```

### Badge Support
```tsx
<IconBtn badge="3">🔔</IconBtn>     // Notification count
<IconBtn badge="99+">💬</IconBtn>   // Message count
```

## 📖 Quick Usage

### Basic
```tsx
import IconBtn from '@components/buttons/IconBtn'

<IconBtn onClick={handleClick}>
  🔔
</IconBtn>
```

### With Badge
```tsx
<IconBtn badge="5" variant="gold">
  🔔
</IconBtn>
```

### In Header/Topbar
```tsx
<IconBtn badge="3" aria-label="Notifications">
  🔔
</IconBtn>

<IconBtn aria-label="Messages">
  💬
</IconBtn>
```

## 🎯 Props

```typescript
interface IconBtnProps {
  children: React.ReactNode        // Icon content
  size?: 'sm' | 'md' | 'lg'       // Size (default: 'md')
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'success' | 'gold'
  badge?: string | number          // Badge content
  className?: string               // Additional classes
  disabled?: boolean               // Disabled state
  onClick?: () => void             // Click handler
}
```

## 🎨 Theme Colors

- **Default:** Gray (#888888)
- **Primary:** Gold background (#e2c36a)
- **Hover:** Gold color with light background
- **Badge:** Red (#ff4444)
- **Focus:** Gold outline

## 🔄 Migration from Material-UI

**Before:**
```tsx
import { IconButton } from '@mui/material'

<IconButton size="small" sx={{ color: 'var(--text-secondary)' }}>
  🔔
</IconButton>
```

**After:**
```tsx
import IconBtn from '@components/buttons/IconBtn'

<IconBtn size="sm">
  🔔
</IconBtn>
```

## ✨ Benefits

✅ **Consistent Theme** - Matches dashboard.html design  
✅ **SCSS Styling** - No inline styles  
✅ **Badge Support** - Built-in notification badges  
✅ **Multiple Variants** - 6 color variants  
✅ **Responsive** - Mobile-friendly  
✅ **Accessible** - Keyboard navigation + ARIA  
✅ **React Bootstrap** - Standard framework  

## 📚 Full Documentation

See **`ICONBTN_UPDATE_GUIDE.md`** for:
- Complete API reference
- All variants and examples
- Customization guide
- Accessibility features
- Troubleshooting

---

**Status:** ✅ Complete  
**Framework:** React Bootstrap  
**Theme:** Dashboard.html colors  
**Ready to use!**
