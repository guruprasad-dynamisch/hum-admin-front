# IconBtn Component - Update Guide

## ✅ What Changed

### Migrated from Material-UI to React Bootstrap
- **Before:** Used `@mui/material` IconButton
- **After:** Uses `react-bootstrap` Button with custom SCSS

### New Theme Integration
- Uses dashboard.html color scheme
- Gold theme (#e2c36a)
- Dark backgrounds
- Smooth transitions

## 📁 Files Updated

### Component
- **`src/components/buttons/IconBtn.tsx`** - Migrated to React Bootstrap

### Styles
- **`src/styles/components/icon-btn.scss`** - New SCSS styles

### Updated
- **`src/styles/components/index.scss`** - Added icon-btn import
- **`src/components/ProtectedLayout.tsx`** - Uses DashboardHeader

## 🎨 New Features

### Variants
```tsx
<IconBtn variant="default">🔔</IconBtn>   // Default gray
<IconBtn variant="primary">✓</IconBtn>    // Gold background
<IconBtn variant="secondary">⚙️</IconBtn>  // Dark background
<IconBtn variant="danger">✕</IconBtn>     // Red color
<IconBtn variant="success">✓</IconBtn>    // Green color
<IconBtn variant="gold">⭐</IconBtn>      // Gold color
```

### Sizes
```tsx
<IconBtn size="sm">🔔</IconBtn>  // Small (18px)
<IconBtn size="md">🔔</IconBtn>  // Medium (20px) - default
<IconBtn size="lg">🔔</IconBtn>  // Large (24px)
```

### Badge Support
```tsx
<IconBtn badge="3">🔔</IconBtn>        // Notification count
<IconBtn badge="99+">💬</IconBtn>      // Message count
<IconBtn badge="NEW">⭐</IconBtn>      // Text badge
```

## 📖 Usage Examples

### Basic Icon Button
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

### Different Variants
```tsx
// Default (gray)
<IconBtn>⚙️</IconBtn>

// Primary (gold background)
<IconBtn variant="primary">✓</IconBtn>

// Secondary (dark background)
<IconBtn variant="secondary">📁</IconBtn>

// Danger (red)
<IconBtn variant="danger">🗑️</IconBtn>

// Success (green)
<IconBtn variant="success">✓</IconBtn>

// Gold (gold text)
<IconBtn variant="gold">⭐</IconBtn>
```

### Different Sizes
```tsx
<IconBtn size="sm">🔔</IconBtn>
<IconBtn size="md">🔔</IconBtn>
<IconBtn size="lg">🔔</IconBtn>
```

### Disabled State
```tsx
<IconBtn disabled>🔔</IconBtn>
```

### With Click Handler
```tsx
<IconBtn onClick={() => console.log('Clicked!')}>
  🔔
</IconBtn>
```

### Custom Class
```tsx
<IconBtn className="my-custom-class">
  🔔
</IconBtn>
```

### In Topbar/Header
```tsx
<div className="topbar-right">
  <IconBtn badge="3" variant="gold">
    🔔
  </IconBtn>
  
  <IconBtn>
    💬
  </IconBtn>
  
  <IconBtn variant="secondary">
    ⚙️
  </IconBtn>
</div>
```

## 🎯 Props API

```typescript
interface IconBtnProps {
  children: React.ReactNode        // Icon or content
  size?: 'sm' | 'md' | 'lg'       // Button size (default: 'md')
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'success' | 'gold'
  badge?: string | number          // Badge content
  className?: string               // Additional CSS classes
  disabled?: boolean               // Disabled state
  onClick?: () => void             // Click handler
  // ... all other React Bootstrap Button props
}
```

## 🎨 Styling

### Colors (from _variables.scss)
- **Default:** `$text-secondary` (#888888)
- **Hover:** `$text-primary` (#ffffff)
- **Primary:** `$primary-gold` (#e2c36a)
- **Background:** `$bg-hover` (rgba(226, 195, 106, 0.05))
- **Badge:** `$status-error` (#ff4444)

### Sizes
- **Small:** 18px icon, 4px padding
- **Medium:** 20px icon, 8px padding
- **Large:** 24px icon, 12px padding

### Effects
- **Hover:** Color change + background
- **Active:** Scale down (0.95)
- **Focus:** Gold outline
- **Disabled:** 50% opacity

## 🔄 Migration Guide

### From Material-UI IconButton

**Before:**
```tsx
import { IconButton } from '@mui/material'

<IconButton 
  size="small"
  sx={{ color: 'var(--text-secondary)' }}
>
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

### Size Mapping
- Material-UI `small` → `sm`
- Material-UI `medium` → `md`
- Material-UI `large` → `lg`

### Variant Mapping
- Material-UI `sx` styles → `variant` prop
- Custom colors → Use variant prop

## 💡 Best Practices

### 1. Use Semantic Variants
```tsx
// Good
<IconBtn variant="danger" onClick={handleDelete}>🗑️</IconBtn>
<IconBtn variant="success" onClick={handleSave}>✓</IconBtn>

// Avoid
<IconBtn onClick={handleDelete}>🗑️</IconBtn>
```

### 2. Add ARIA Labels
```tsx
<IconBtn aria-label="Notifications" badge="5">
  🔔
</IconBtn>
```

### 3. Use Badges for Counts
```tsx
<IconBtn badge={notificationCount}>
  🔔
</IconBtn>
```

### 4. Consistent Sizing
```tsx
// In a button group, use same size
<div className="icon-btn-group">
  <IconBtn size="md">🔔</IconBtn>
  <IconBtn size="md">💬</IconBtn>
  <IconBtn size="md">⚙️</IconBtn>
</div>
```

## 🎨 Customization

### Override Colors
```scss
// In your component SCSS
.my-custom-icon-btn {
  &.icon-btn {
    color: #your-color;
    
    &:hover {
      background: #your-hover-color;
    }
  }
}
```

### Custom Badge Style
```scss
.icon-btn-badge {
  background: $primary-gold;
  color: $bg-primary;
}
```

### Add New Variant
```scss
// In icon-btn.scss
.icon-btn-info {
  color: $status-info;
  
  &:hover {
    background: rgba(0, 170, 255, 0.1);
  }
}
```

## 🧪 Testing

```tsx
// Test basic rendering
<IconBtn>🔔</IconBtn>

// Test with badge
<IconBtn badge="5">🔔</IconBtn>

// Test variants
<IconBtn variant="primary">✓</IconBtn>
<IconBtn variant="danger">✕</IconBtn>

// Test sizes
<IconBtn size="sm">🔔</IconBtn>
<IconBtn size="lg">🔔</IconBtn>

// Test disabled
<IconBtn disabled>🔔</IconBtn>

// Test click handler
<IconBtn onClick={() => console.log('Clicked')}>🔔</IconBtn>
```

## 📱 Responsive

The IconBtn component is responsive by default:
- Maintains aspect ratio
- Scales with font size
- Touch-friendly on mobile
- Accessible keyboard navigation

## ♿ Accessibility

### Built-in Features
- ✅ Keyboard accessible (Tab, Enter, Space)
- ✅ Focus visible outline
- ✅ ARIA support
- ✅ Screen reader friendly

### Best Practices
```tsx
// Always add aria-label for icon-only buttons
<IconBtn aria-label="Notifications">🔔</IconBtn>

// Use aria-pressed for toggle buttons
<IconBtn aria-pressed={isActive}>⭐</IconBtn>

// Disable when needed
<IconBtn disabled aria-label="Loading">⏳</IconBtn>
```

## 🐛 Troubleshooting

### Issue: Button not styled
**Solution:** Ensure `icon-btn.scss` is imported in `components/index.scss`

### Issue: Badge not showing
**Solution:** Pass `badge` prop with value: `<IconBtn badge="3">🔔</IconBtn>`

### Issue: Hover not working
**Solution:** Check that button is not disabled

### Issue: Wrong size
**Solution:** Use `size` prop: `sm`, `md`, or `lg`

## 📚 Related Components

- **DashboardHeader** - Uses IconBtn for notifications/messages
- **Topbar** - Uses IconBtn for actions
- **Sidebar** - Can use IconBtn for actions

---

**Status:** ✅ Complete  
**Framework:** React Bootstrap  
**Styling:** SCSS with dashboard theme  
**Compatible:** All modern browsers
